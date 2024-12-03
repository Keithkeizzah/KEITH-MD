class TicTacToe {
    constructor(playerX = 'x', playerO = 'o') {
        this.playerX = playerX;
        this.playerO = playerO;
        this._currentTurn = false;
        this._x = 0;
        this._o = 0;
        this.turns = 0;
    }

    get board() {
        return this._x | this._o;
    }

    get currentTurn() {
        return this._currentTurn ? this.playerO : this.playerX;
    }

    get enemyTurn() {
        return this._currentTurn ? this.playerX : this.playerO;
    }

    static check(state) {
        for (let combo of [7, 56, 73, 84, 146, 273, 292, 448]) {
            if ((state & combo) === combo) return true;
        }
        return false;
    }

    static toBinary(x = 0, y = 0) {
        if (x < 0 || x > 2 || y < 0 || y > 2) throw new Error('Invalid position');
        return 1 << x + (3 * y);
    }

    turn(player = 0, x = 0, y) {
        if (this.board === 511) return -3;  // Game ended
        let pos = 0;
        if (y == null) {
            if (x < 0 || x > 8) return -1;  // Invalid position
            pos = 1 << x;
        } else {
            if (x < 0 || x > 2 || y < 0 || y > 2) return -1;  // Invalid position
            pos = TicTacToe.toBinary(x, y);
        }
        if (this._currentTurn ^ player) return -2;  // Not the player's turn
        if (this.board & pos) return 0;  // Position occupied
        this[this._currentTurn ? '_o' : '_x'] |= pos;
        this._currentTurn = !this._currentTurn;
        this.turns++;
        return 1;
    }

    static render(boardX = 0, boardO = 0) {
        let x = parseInt(boardX.toString(2), 4);
        let y = parseInt(boardO.toString(2), 4) * 2;
        return [...(x + y).toString(4).padStart(9, '0')].reverse().map((value, index) => value == 1 ? 'X' : value == 2 ? 'O' : ++index);
    }

    render() {
        return TicTacToe.render(this._x, this._o);
    }

    get winner() {
        let x = TicTacToe.check(this._x);
        let o = TicTacToe.check(this._o);
        return x ? this.playerX : o ? this.playerO : false;
    }
}

module.exports = async (context) => {
    const { client, m, text, prefix } = context;

    // Ensure game state is initialized
    client.game = client.game || {};
    
    // Check if player is already in an ongoing game
    if (Object.values(client.game).find(room => room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender))) {
        m.reply(`You are still in the game. To restart the session, type: *${prefix}delttt*`);
        return;
    }

    if (!text) {
        m.reply('Please provide a room number.');
        return;
    }

    // Find a waiting room or create a new game
    let room = Object.values(client.game).find(room => room.state === 'WAITING' && (text ? room.name === text : true));

    if (room) {
        m.reply('✅ Mate found!');
        room.o = m.chat;
        room.game.playerO = m.sender;
        room.state = 'PLAYING';

        let arr = room.game.render().map(v => {
            return {
                X: '❎',
                O: '⭕',
                1: '1️⃣',
                2: '2️⃣',
                3: '3️⃣',
                4: '4️⃣',
                5: '5️⃣',
                6: '6️⃣',
                7: '7️⃣',
                8: '8️⃣',
                9: '9️⃣',
            }[v];
        });

        let str = `
Waiting for @${room.game.currentTurn.split('@')[0]} as the first player

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

▢ *Room ID*: ${room.id}

▢ *Rules*
‣ Make 3 rows of symbols vertically, horizontally, or diagonally to win.
‣ Type *surrender* to exit the game and be declared defeated.
        `.trim();

        // Send the game status to both players
        if (room.x !== room.o) {
            await client.reply(room.x, str, m, { mentions: client.parseMention(str) });
        }
        await client.reply(room.o, str, m, { mentions: client.parseMention(str) });
    } else {
        room = {
            id: 'tictactoe-' + (+new Date()),
            x: m.chat,
            o: '',
            game: new TicTacToe(m.sender, 'o'),
            state: 'WAITING'
        };

        if (text) room.name = text;

        m.reply(m.chat, `⏳ *Expecting partner...*\nType the following command to accept\n▢ *${prefix}join ${text}*\n🎁 Reward: *4999 XP*`, m, { mentions: client.parseMention(text) });

        client.game[room.id] = room;
    }
};

let debugMode = false;
let winScore = 4999;
let playScore = 99;

export async function before(m) {
    let ok;
    let isWin = false;
    let isTie = false;
    let isSurrender = false;
    
    this.game = this.game || {};
    
    let room = Object.values(this.game).find(room => room.id && room.game && room.state && room.id.startsWith('tictactoe') && [room.game.playerX, room.game.playerO].includes(m.sender) && room.state == 'PLAYING');
    
    if (room) {
        if (!/^([1-9]|(me)?nyerah|surr?ender)$/i.test(m.text)) return true;

        isSurrender = !/^[1-9]$/.test(m.text);
        
        if (m.sender !== room.game.currentTurn) { 
            if (!isSurrender) return true;
        }

        if (debugMode) m.reply('[DEBUG]\n' + require('util').format({ isSurrender, text: m.text }));

        if (!isSurrender && 1 > (ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1))) {
            m.reply({
                '-3': 'The game is over',
                '-2': 'Invalid',
                '-1': 'Position invalid',
                0: 'Position occupied',
            }[ok]);
            return true;
        }

        if (m.sender === room.game.winner) isWin = true;
        else if (room.game.board === 511) isTie = true;

        let arr = room.game.render().map(v => {
            return {
                X: '❎',
                O: '⭕',
                1: '1️⃣',
                2: '2️⃣',
                3: '3️⃣',
                4: '4️⃣',
                5: '5️⃣',
                6: '6️⃣',
                7: '7️⃣',
                8: '8️⃣',
                9: '9️⃣',
            }[v];
        });

        if (isSurrender) {
            room.game._currentTurn = m.sender === room.game.playerX;
            isWin = true;
        }

        let winner = isSurrender ? room.game.currentTurn : room.game.winner;
        let str = `
${isWin ? `@${winner.split('@')[0]} You are the winner 🎉 *+${winScore} XP*` : isTie ? `Game over, with a draw *+${playScore} XP*` : `Now it's your turn ${['❎', '⭕'][1 * room.game._currentTurn]} (@${room.game.currentTurn.split('@')[0]})`} 

${arr.slice(0, 3).join('')}
${arr.slice(3, 6).join('')}
${arr.slice(6).join('')}

▢ *PLAYER 1* ❎ : @${room.game.playerX.split('@')[0]} 
▢ *PLAYER 2* ⭕ : @${room.game.playerO.split('@')[0]}

Type *surrender* to give up
        `.trim();

        let users = global.global.db.data.users;

        if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat)
            room[room.game._currentTurn ^ isSurrender ? 'x' : 'o'] = m.chat;

        const btn = isTie ? ['TicTacToe', '/ttt'] : ['Surrender', 'surrender'];

        if (room.x !== room.o) {
            await this.reply(room.x, str, m, { mentions: this.parseMention(str) });
        }

        await this.reply(room.o, str, m, { mentions: this.parseMention(str) });

        if (isTie || isWin) {
            users[room.game.playerX].exp += playScore;
            users[room.game.playerO].exp += playScore;
            if (isWin) {
                users[winner].exp += winScore - playScore;
            }
            if (debugMode) m.reply('[DEBUG]\n' + format(room));
            delete this.game[room.id];
        }
    }

    return true;
}

export default TicTacToe;
