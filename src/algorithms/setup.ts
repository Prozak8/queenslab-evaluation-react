import fs from 'fs';
import path from 'path';

async function globalSetup() {
    const inputTextFile = fs.existsSync(path.join(__dirname, 'big-string.txt'));

    // Avoid rewriting file for every restart
    if (inputTextFile) return;

    const content = 'A'.repeat(100000) + 'B'.repeat(100000) + 'C'.repeat(100000) + 'D'.repeat(100000);

    fs.writeFileSync(path.join(__dirname, 'big-string.txt'), content);
}

await globalSetup();
