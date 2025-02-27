const { sendReply } = require(__dirname + "/../../lib/context"); 

const Ownermiddleware = async (context, next) => {
    const { m, isOwner, client } = context;

    
    if (!isOwner) {
        return sendReply(client, m, "You need owner privileges to execute this command."); 
    }

    
    await next();
};

module.exports = Ownermiddleware;
