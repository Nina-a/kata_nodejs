const fs = require('fs');
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Quel est l'id ? ", async number => {
    const givenId = parseInt(number, 10);

    const readable = fs.createReadStream('./input.json', { encoding: 'utf8' });

    await (findName(readable, givenId));
    rl.close();
});

rl.on("close", function () {
    process.exit(0);
});

async function findName(readable, givenId) {
    for await (const chunk of readable) {
        if (chunk.indexOf(givenId) != -1) {

            let openingBracket = chunk.slice(0, chunk.indexOf(givenId)).lastIndexOf('{');
            let closingBracket = chunk.indexOf('}', chunk.indexOf(givenId)) + 1;

            if (openingBracket != -1 && closingBracket != -1) {
                let str = JSON.parse(chunk.slice(openingBracket, closingBracket));
                if (str.id === givenId) {
                    console.log(`${str.id} | ${str.name}`);
                    break;
                    
                }
            }
        }
    }
}
