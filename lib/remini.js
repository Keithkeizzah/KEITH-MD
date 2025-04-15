// In your remini module
const FormData = require("form-data");

async function enhanceImage(imageBuffer, action = 'enhance') {
  const validActions = ['enhance', 'recolor', 'dehaze'];
  const selectedAction = validActions.includes(action) ? action : 'enhance';

  const form = new FormData();
  
  form.append("model_version", "1"); // Simplified version
  form.append('image', imageBuffer, { // Use buffer directly
    filename: "enhance_image.jpg",
    contentType: "image/jpeg"
  });

  return new Promise((resolve, reject) => {
    form.submit({
      host: "inferenceengine.vyro.ai",
      path: `/${selectedAction}`,
      protocol: "https:",
      headers: {
        'User-Agent': 'okhttp/4.9.3',
        'Connection': "Keep-Alive",
        'Accept-Encoding': "gzip"
      }
    }, (err, response) => {
      if (err) return reject(err);
      
      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    });
  });
}

module.exports = { enhanceImage };
