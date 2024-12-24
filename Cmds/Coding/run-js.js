module.exports = async (context) => {
    const { m } = context;

const {c, cpp, node, python, java} = require('compile-run');

    if (m.quoted && m.quoted.text) {
        const code = m.quoted.text;

async function runCode() {
  try {
    let result = await node.runSource(code);
    console.log(result);
    m.reply(result.stdout);
    m.reply(result.stderr);
  } catch (err) {
    console.log(err);
    m.reply(err.stderr);
  }
}

runCode();

} else { 

m.reply('Quote a valid and short JavaScript code to compile')

}

}