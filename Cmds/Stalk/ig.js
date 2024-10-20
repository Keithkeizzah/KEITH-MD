module.exports = async (context) => {

const { client, m, text } = context;
/* try {


const response = await fetch(`https://itzpire.com/stalk/instagram?username=${text}`)

const data = await response.json()
 
    const username = data.data.username;
    const bio = data.data.bio;
    const profilePic = data.data.profile;
    const posts = data.data.posts
    const followers = data.data.followers;
    const following = data.data.following;
   const name = data.data.fullName;
    
const message = `Name:- ${name}\n\nUsername:- ${username}\n\nBio:- ${bio}\n\nFollowers:- ${followers}\n\nFollowing:- ${following}\n\nPosts:- ${posts}`

await client.sendMessage(m.chat, { image: { url: profilePic}, caption: message}, {quoted: m})


} catch (error) {

console.log("Unable to fetch data\n" + error) */


 try {
if (!text) return m.reply('Provide an instagram username to stalk');
const response = await fetch(`https://www.guruapi.tech/api/igstalk?username=${text}`)

const data = await response.json()

const user = data.username;
const nam = data.name;
const bioo = data.biography;
const post = data.posts;

const folowers = data.followers;
const folowing = data.following;

const pict = data.profile_picture;

const messag = `Name:- ${nam}\n\nUsername:- ${user}\n\nBio:- ${bioo}\n\nFollowers:- ${folowers}\n\nFollowing:- ${folowing}\n\nPosts:- ${post}`


await client.sendMessage(m.chat, { image: { url: pict }, caption: messag }, {quoted: m})

} catch (error) {

console.log("Error occured")

}





}