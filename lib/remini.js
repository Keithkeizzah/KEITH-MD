const FormData = require("form-data");

async function enhanceImage(imageBuffer, action) {
  return new Promise(async (resolve, reject) => {
    
    const validActions = ['enhance', 'recolor', 'dehaze'];

    
    if (!validActions.includes(action)) {
      action = validActions[0]; 
    }

    
    const form = new FormData();

    
    const url = `https://inferenceengine.vyro.ai/${action}`;

   
    form.append("model_version", 1, {
      'Content-Transfer-Encoding': "binary",
      'contentType': "multipart/form-data; charset=utf-8"
    });

    form.append('image', Buffer.from(imageBuffer), {
      'filename': "enhance_image_body.jpg",
      'contentType': "image/jpeg"
    });

    
    form.submit({
      url: url,
      host: "inferenceengine.vyro.ai",
      path: `/${action}`,
      protocol: "https:",
      headers: {
        'User-Agent': 'okhttp/4.9.3',
        'Connection': "Keep-Alive",
        'Accept-Encoding': "gzip"
      }
    }, function (err, response) {
      if (err) {
        reject(err); 
      }

      let responseData = [];
      
      
      response.on('data', function (chunk) {
        responseData.push(chunk);
      }).on("end", () => {
        
        resolve(Buffer.concat(responseData));
      });

      
      response.on("error", () => {
        reject(new Error('Error during the response.'));
      });
    });
  });
}

module.exports.enhanceImage = enhanceImage;
