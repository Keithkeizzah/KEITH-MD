const { downloadTiktok } = require("./index");

async function TEST_TIKTOK_DL(){
    var link = "https://vt.tiktok.com/ZS27wGtjQ/"
    var result = await downloadTiktok(link);
    return console.log(result)
}
TEST_TIKTOK_DL()
