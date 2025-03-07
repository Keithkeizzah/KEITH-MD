let calculator = require("../index").Calculator
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});




console.log("-> .q to quit")
loop();

function loop() {
    rl.question("Enter your Expression : ", (expression) => {
        if (expression.toLocaleLowerCase() == ".q") {
            rl.close();
        } else {
            console.log(calculator.execute(expression));
            loop();
        }
    });
}



rl.on('close', () => {
    console.log("\nBye");
    process.exit(0);
})