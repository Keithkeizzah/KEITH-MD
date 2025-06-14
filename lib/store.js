const fs = require("fs")
const chalk = require("chalk")
const events = require('events')
const pino = require('pino')

class InMemoryStore extends events.EventEmitter {
    constructor(options) {
        super()
        this.contacts = {}
        this.chats = {}
        this.messages = {}
        this.presences = {}
        this.groupMetadata = {}
        this.callOffer = {}
        this.stickerPacks = {}
        this.authState = {}
        this.syncedHistory = {}
        this.logger = options?.logger || pino({ level: 'silent' })
    }

    load(state) {
        Object.assign(this, state)
        this.logger.info('Store loaded')
    }

    save() {
        const state = {
            contacts: this.contacts,
            chats: this.chats,
            messages: this.messages,
            presences: this.presences,
            groupMetadata: this.groupMetadata,
            callOffer: this.callOffer,
            stickerPacks: this.stickerPacks,
            authState: this.authState,
            syncedHistory: this.syncedHistory,
        }
        this.logger.debug('Store saved')
        return state
    }

writeToFile(filename = 'store.json') {
    const data = this.save();
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
    this.logger.info(`Store written to ${filename}`);
}

    clear() {
        this.contacts = {}
        this.chats = {}
        this.messages = {}
        this.presences = {}
        this.groupMetadata = {}
        this.callOffer = {}
        this.stickerPacks = {}
        this.authState = {}
        this.syncedHistory = {}
        this.logger.info('Store cleared')
    }

    setContacts(contacts) {
        this.contacts = { ...this.contacts, ...contacts }
        this.emit('contacts.set', contacts)
    }

    upsertContact(contact) {
        this.contacts[contact.id] = { ...this.contacts[contact.id], ...contact }
        this.emit('contacts.upsert', [contact])
    }

    updateContact(update) {
        for (const contact of update) {
            if (this.contacts[contact.id]) {
                this.contacts[contact.id] = { ...this.contacts[contact.id], ...contact }
                this.emit('contacts.update', [contact])
            }
        }
    }

    deleteContact(ids) {
        for (const id of ids) {
            delete this.contacts[id]
        }
        this.emit('contacts.delete', ids)
    }

    setChats(chats) {
        this.chats = { ...this.chats, ...chats }
        this.emit('chats.set', chats)
    }

    upsertChat(chat) {
        this.chats[chat.id] = { ...this.chats[chat.id], ...chat }
        this.emit('chats.upsert', [chat])
    }

    updateChat(update) {
        for (const chat of update) {
            if (this.chats[chat.id]) {
                this.chats[chat.id] = { ...this.chats[chat.id], ...chat }
                this.emit('chats.update', [chat])
            }
        }
    }

    deleteChat(ids) {
        for (const id of ids) {
            delete this.chats[id]
        }
        this.emit('chats.delete', ids)
    }

    setMessages(chatId, messages) {
        this.messages[chatId] = messages.reduce((acc, msg) => {
            acc[msg.key.id] = msg
            return acc
        }, {})
        this.emit('messages.set', { chatId, messages })
    }

    upsertMessage(message, type) {
        const chatId = message.key.remoteJid
        if (!this.messages[chatId]) {
            this.messages[chatId] = {}
        }
        this.messages[chatId][message.key.id] = message
        this.emit('messages.upsert', { messages: [message], type })
    }

    updateMessage(updates) {
        for (const update of updates) {
            const chatId = update.key.remoteJid
            if (this.messages[chatId]?.[update.key.id]) {
                this.messages[chatId][update.key.id] = { ...this.messages[chatId][update.key.id], ...update }
                this.emit('messages.update', [update])
            }
        }
    }

    deleteMessage(keys) {
        for (const key of keys) {
            const chatId = key.remoteJid
            if (this.messages[chatId]?.[key.id]) {
                delete this.messages[chatId][key.id]
                this.emit('messages.delete', [key])
            }
        }
    }

    loadMessage(jid, id) {
        return this.messages[jid]?.[id]
    }

    setPresence(chatId, presence) {
        if (!this.presences[chatId]) {
            this.presences[chatId] = {}
        }
        if (presence && presence.participant) {
            this.presences[chatId][presence.participant] = presence
            this.emit('presence.set', { chatId, presence })
        } else {
            this.logger.warn(`Menerima set kehadiran tanpa properti participant: ${JSON.stringify(presence)}`)
        }
    }

    updatePresence(chatId, presence) {
        if (!this.presences[chatId]) {
            this.presences[chatId] = {}
        }
        if (presence && presence.participant) {
            this.presences[chatId][presence.participant] = { ...this.presences[chatId][presence.participant], ...presence }
            this.emit('presence.update', { chatId, presence })
        } else {
            this.logger.warn(`Menerima pembaruan kehadiran tanpa properti participant: ${JSON.stringify(presence)}`)
        }
    }

    setGroupMetadata(groupId, metadata) {
        this.groupMetadata[groupId] = metadata
        this.emit('groups.update', [{ id: groupId, ...metadata }])
    }

    updateGroupMetadata(update) {
        for (const data of update) {
            if (this.groupMetadata[data.id]) {
                this.groupMetadata[data.id] = { ...this.groupMetadata[data.id], ...data }
                this.emit('groups.update', [data])
            }
        }
    }

    setCallOffer(peerJid, offer) {
        this.callOffer[peerJid] = offer
        this.emit('call', [{ peerJid, ...offer }])
    }

    clearCallOffer(peerJid) {
        delete this.callOffer[peerJid]
        this.emit('call.update', [{ peerJid, state: 'ENDED' }])
    }

    setStickerPacks(packs) {
        this.stickerPacks = packs.reduce((acc, pack) => {
            acc[pack.id] = pack
            return acc
        }, {})
        this.emit('sticker-packs.set', packs)
    }

    upsertStickerPack(pack) {
        this.stickerPacks[pack.id] = { ...this.stickerPacks[pack.id], ...pack }
        this.emit('sticker-packs.upsert', [pack])
    }

    setAuthState(state) {
        this.authState = state
    }

    getAuthState() {
        return this.authState
    }

    markHistorySynced(jid) {
        this.syncedHistory[jid] = true
    }

    isHistorySynced(jid) {
        return !!this.syncedHistory[jid]
    }

    bind(ev) {
        ev.on('contacts.set', (contacts) => this.setContacts(contacts))
        ev.on('contacts.upsert', (contacts) => contacts.forEach(this.upsertContact.bind(this)))
        ev.on('contacts.update', this.updateContact.bind(this))
        ev.on('contacts.delete', this.deleteContact.bind(this))

        ev.on('chats.set', (chats) => this.setChats(chats))
        ev.on('chats.upsert', (chats) => chats.forEach(this.upsertChat.bind(this)))
        ev.on('chats.update', this.updateChat.bind(this))
        ev.on('chats.delete', (ids) => this.deleteChat(ids))

        ev.on('messages.set', ({ messages, jid }) => this.setMessages(jid, messages))
        ev.on('messages.upsert', ({ messages, type }) => messages.forEach(msg => this.upsertMessage(msg, type)))
        ev.on('messages.update', this.updateMessage.bind(this))
        ev.on('messages.delete', (keys) => this.deleteMessage(keys))

        ev.on('presence.set', ({ id, presence }) => this.setPresence(id, presence))
        ev.on('presence.update', ({ id, presence }) => this.updatePresence(id, presence))

        ev.on('groups.update', this.updateGroupMetadata.bind(this))
        ev.on('groups.upsert', (groups) => groups.forEach(group => this.setGroupMetadata(group.id, group)))

        ev.on('call', (calls) => calls.forEach(call => {
            if (call.offer) {
                this.setCallOffer(call.peerJid, call)
            } else if (call.state === 'ENDED') {
                this.clearCallOffer(call.peerJid)
            }
        }))

        ev.on('sticker-packs.set', (packs) => this.setStickerPacks(packs))
        ev.on('sticker-packs.upsert', (packs) => packs.forEach(this.upsertStickerPack.bind(this)))

        ev.on('auth-state.update', (state) => this.setAuthState(state))
        ev.on('history-sync.completed', (jid) => this.markHistorySynced(jid))
    }
}

function makeInMemoryStore(options) {
    return new InMemoryStore(options)
}

module.exports = makeInMemoryStore

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log()
    console.log(`› [ ${chalk.black(chalk.bgBlue(" Update Files "))} ] ▸ ${__filename}`)
    delete require.cache[file]
    require(file)
})
