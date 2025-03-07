# QuickMongo

Quick Mongodb wrapper for beginners that provides key-value based interface.

![](https://camo.githubusercontent.com/ee0b303561b8c04223d4f469633e2088968cf514f0f6901c729331c462a32f10/68747470733a2f2f63646e2e646973636f72646170702e636f6d2f6174746163686d656e74732f3739333638393539323431343939343436362f3833323039343438363834353834393631302f6c6f676f2e37393539646231325f35302e706e67)

# Installing

```bash
$ npm install --save quickmongo
```

# Documentation
**[https://quickmongo.js.org](https://quickmongo.js.org)**

# Features
- Beginner friendly
- Asynchronous
- Dot notation support
- Key-Value like interface
- Easy to use
- TTL (temporary storage) supported
- Provides quick.db compatible API
- MongoDriver for quick.db

# Example

## QuickMongo

```js
import { Database } from "quickmongo";

const db = new Database("mongodb://localhost:27017/quickmongo");

db.on("ready", () => {
    console.log("Connected to the database");
    doStuff();
});

// top-level awaits
await db.connect(); 

async function doStuff() {
    // Setting an object in the database:
    await db.set("userInfo", { difficulty: "Easy" });
    // -> { difficulty: 'Easy' }

    // Pushing an element to an array (that doesn't exist yet) in an object:
    await db.push("userInfo.items", "Sword");
    // -> { difficulty: 'Easy', items: ['Sword'] }

    // Adding to a number (that doesn't exist yet) in an object:
    await db.add("userInfo.balance", 500);
    // -> { difficulty: 'Easy', items: ['Sword'], balance: 500 }

    // Repeating previous examples:
    await db.push("userInfo.items", "Watch");
    // -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 500 }
    await db.add("userInfo.balance", 500);
    // -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 1000 }

    // Fetching individual properties
    await db.get("userInfo.balance"); // -> 1000
    await db.get("userInfo.items"); // -> ['Sword', 'Watch']

    // remove item
    await db.pull("userInfo.items", "Sword");
    // -> { difficulty: 'Easy', items: ['Watch'], balance: 1000 }

    // set the data and automatically delete it after 1 minute
    await db.set("foo", "bar", 60); // 60 seconds = 1 minute

    // fetch the temporary data after a minute
    setTimeout(async () => {
        await db.get("foo"); // null
    }, 60_000);
}
```

## Usage with quick.db

```js
const { QuickDB } = require("quick.db");
// get mongo driver
const { MongoDriver } = require("quickmongo");
const driver = new MongoDriver("mongodb://localhost/quickdb");

driver.connect().then(() => {
    console.log(`Connected to the database!`);
    init();
});

async function init() {
    // use quickdb with mongo driver
    // make sure this part runs after connecting to mongodb
    const db = new QuickDB({ driver });

    // self calling async function just to get async
    // Setting an object in the database:
    console.log(await db.set("userInfo", { difficulty: "Easy" }));
    // -> { difficulty: 'Easy' }

    // Getting an object from the database:
    console.log(await db.get("userInfo"));
    // -> { difficulty: 'Easy' }

    // Getting an object property from the database:
    console.log(await db.get("userInfo.difficulty"));
    // -> 'Easy'

    // Pushing an element to an array (that doesn't exist yet) in an object:
    console.log(await db.push("userInfo.items", "Sword"));
    // -> { difficulty: 'Easy', items: ['Sword'] }

    // Adding to a number (that doesn't exist yet) in an object:
    console.log(await db.add("userInfo.balance", 500));
    // -> { difficulty: 'Easy', items: ['Sword'], balance: 500 }

    // Repeating previous examples:
    console.log(await db.push("userInfo.items", "Watch"));
    // -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 500 }
    console.log(await db.add("userInfo.balance", 500));
    // -> { difficulty: 'Easy', items: ['Sword', 'Watch'], balance: 1000 }

    // Fetching individual properties
    console.log(await db.get("userInfo.balance")); // -> 1000
    console.log(await db.get("userInfo.items")); // ['Sword', 'Watch']

    // disconnect from the database
    await driver.close();
}
```

**Created and maintained by Archaeopteryx1**

# Discord Support
**[CesiumLabs](https://discord.gg/uqB8kxh)**
