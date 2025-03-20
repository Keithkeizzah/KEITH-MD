const more = String.fromCharCode(8206); // Zero-width non-joiner character
const readMore = more.repeat(4001); // Repeat the character 4001 times

module.exports = async (context) => {
    const { m, text } = context; // Extract 'm' and 'text' from the context

    // Split text into 'l' and 'r' based on the delimiter '|'
    let [l, r] = text.split('|');

    // Ensure 'l' and 'r' are initialized if not already set
    l = l || '';
    r = r || '';

    // Send the modified message back
    m.reply(m.chat, l + readMore + r, m);
};
