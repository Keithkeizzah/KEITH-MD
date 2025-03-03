const fs = require('fs');
const path = require('path');

const storePath = path.join(__dirname, 'store.json');

// Read data from JSON file
function readStore() {
  if (!fs.existsSync(storePath)) {
    return {};
  }
  const data = fs.readFileSync(storePath);
  return JSON.parse(data);
}

// Write data to JSON file
function writeStore(data) {
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2));
}

async function addUserWithWarnCount(jid) {
  const store = readStore();
  if (!store[jid]) {
    store[jid] = { warn_count: 0 };
  }
  store[jid].warn_count += 1;
  writeStore(store);
  console.log(`User ${jid} added or updated with a warn_count of ${store[jid].warn_count}.`);
}

async function getWarnCountByJID(jid) {
  const store = readStore();
  if (store[jid]) {
    return store[jid].warn_count;
  } else {
    return 0; // If the user is not found, return 0
  }
}

async function resetWarnCountByJID(jid) {
  const store = readStore();
  if (store[jid]) {
    store[jid].warn_count = 0;
    writeStore(store);
    console.log(`The warn_count for user ${jid} has been reset to 0.`);
  }
}

module.exports = {
  addUserWithWarnCount,
  getWarnCountByJID,
  resetWarnCountByJID,
};
