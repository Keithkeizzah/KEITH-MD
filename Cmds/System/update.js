const axios = require("axios");
const { appname, herokuapi } = require("../../settings");
const ownerMiddleware = require('../../Middleware/ownerMiddleware');

module.exports = async (context) => {
    await ownerMiddleware(context, async () => {
        const { client, m, text, Owner } = context;
      const appname = herokuAppName;
      const herokuapi = herokuApiKey;

        if (!herokuAppName || !herokuApiKey) {
            await m.reply("It looks like the Heroku app name or API key is not set. Please make sure you have set the `HEROKU_APP_NAME` and `HEROKU_API_KEY` environment variables.");
            return;
        }

        async function redeployApp() {
            try {
                const response = await axios.post(
                    `https://api.heroku.com/apps/${herokuAppName}/builds`,
                    {
                        source_blob: {
                            url: "https://github.com/Kkeizzah/KEITH-MD/tarball/main",
                        },
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${herokuApiKey}`,
                            Accept: "application/vnd.heroku+json; version=3",
                        },
                    }
                );

                await m.reply("Your bot is getting updated, wait 2 mins for the redeploy to finish! This will install the latest version of KEITH-MD");
                console.log("Build details:", response.data);
            } catch (error) {
                const errorMessage = error.response?.data || error.message;
                await m.reply(`Failed to update and redeploy. Please check if you have set the Heroku API key and Heroku app name correctly.`);
                console.error("Error triggering redeploy:", errorMessage);
            }
        }

        redeployApp();
    });
};
