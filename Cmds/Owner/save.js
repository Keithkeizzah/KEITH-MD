/*   Fortunatus :v

What's The Point Of This Code ? */

const ownerMiddleware = require('../../utility/botUtil/Ownermiddleware'); 

module.exports = async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m, Owner } = context;

})

}