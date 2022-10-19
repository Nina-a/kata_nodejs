function randomNumber(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const fs = require('fs');
const rNumber = randomNumber(999999,1);
async function logChunks(readable) {
    for await (const chunk of readable) {
        if (chunk.indexOf(rNumber) != -1) {

            let opening  = chunk.slice(0, chunk.indexOf(rNumber)).lastIndexOf('{');
            let closing = chunk.indexOf('}', chunk.indexOf(rNumber)) + 1;

            if (opening != -1 && closing != -1) {
                let str = JSON.parse(chunk.slice(opening, closing));
                if ( str.id === rNumber ) {
                    console.log(`${str.id} | ${str.name}`);
                }
            }
        }
    }
}

const readable = fs.createReadStream(
    './input.json', { encoding: 'utf8' });

logChunks(readable);