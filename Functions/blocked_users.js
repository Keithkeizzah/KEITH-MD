module.exports = async (client, m, cmd) => {
    const Blocked = await client.fetchBlocklist();
    return cmd && m.isGroup && Blocked.includes(m.sender);
};