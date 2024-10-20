fetch('/settings.js')
  .then(response => response.text())
  .then(data => {
    console.log('Received settings data:', data);
    const settings = JSON.parse(data.replace(/module.exports = /, ''));
    console.log('Parsed settings:', settings);
   

   
    const container = document.querySelector('.container');

    
    const statusSection = document.createElement('div');
    statusSection.innerHTML = `
      <h2>BOT STATUS</h2>
      <p>BOT NAME: ${settings.botname}</p>
      <p>MODE: ${settings.mode}</p>
      <p>PREFIX: ${settings.prefix}</p>
    `;
    container.appendChild(statusSection);
  })
  .catch(error => console.error('Error fetching settings:', error));