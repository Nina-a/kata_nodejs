import fs from "fs";
import readline from "readline";

let givenId = null;

givenId = parseInt(process.argv.filter(arg => isNaN(parseInt(arg)) === false));

if (isNaN(givenId)) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on("close", function () {
        process.exit(0);
    });

    while (isNaN(givenId)) {
        try {
            const askNumber = new Promise((resolve, reject) => {
                rl.question("Quel est l'id ? ", async number => {
                    const givenId = parseInt(number, 10);
                    if (isNaN(givenId)) {
                        reject();
                    }
                    resolve(givenId);
                });
            })
            givenId = await askNumber;
        } catch (error) {
            // Not a number. Asking again
        }
    }

    await searchIdInFile(givenId);

    rl.close();
} else {
    await searchIdInFile(givenId);
}

// Create function to be used for differents cases
// In case where id is the commande line
// In case where id is given as answer
async function searchIdInFile(givenId) {
    let readable = fs.createReadStream('./input.json', { encoding: 'utf8' });

    const nameNotInTheSameChunk = await (findName(readable, givenId));

    if (nameNotInTheSameChunk) {
        readable = fs.createReadStream('./input.json', { encoding: 'utf8', highWaterMark: 128 * 1024 });
        await (findName(readable, givenId));
    }
}

async function findName(readable, givenId) {
    for await (const chunk of readable) {
        if (chunk.indexOf(givenId) != -1) {

            let openingBracket = chunk.slice(0, chunk.indexOf(givenId)).lastIndexOf('{');

            let closingBracket = chunk.indexOf('}', chunk.indexOf(givenId)) + 1;

            if (openingBracket != -1 && closingBracket != -1) {
                if (openingBracket == 0 || closingBracket == 0) {
                    return true;
                } else {
                    // calculation  of the number of  brackets' occurrences
                    ({ openingBracket, closingBracket } = EnsureFirstLevelBrackets(chunk, openingBracket, closingBracket));

                    let str = null, error = null;
                    do {
                        try {
                            str = JSON.parse(chunk.slice(openingBracket, closingBracket));
                            error = null;
                        } catch (err) {
                            error = err;
                            closingBracket = chunk.indexOf('}', closingBracket) + 1;
                            openingBracket = chunk.slice(0, openingBracket).lastIndexOf('{');
                        }
                    } while (error != null)

                    if (str.id === givenId) {
                        console.log(`${str.id} | ${str.name}`);
                        return false;
                    }

                }
            }
        }
    }
}

function EnsureFirstLevelBrackets(chunk, openingBracket, closingBracket) {
    let extract = (chunk.slice(openingBracket, closingBracket));
    let nbOpeningBracket = extract.split('{').length - 1;
    let nbClosingBracket = extract.split('}').length - 1;

    while (nbOpeningBracket != nbClosingBracket) {
        if (nbOpeningBracket > nbClosingBracket) {
            closingBracket = chunk.indexOf('}', closingBracket) + 1;
        } else {
            openingBracket = chunk.slice(0, openingBracket).lastIndexOf('{');
        }
        extract = (chunk.slice(openingBracket, closingBracket));
        nbOpeningBracket = extract.split('{').length - 1;
        nbClosingBracket = extract.split('}').length - 1;
    }
    return { openingBracket, closingBracket };
}
