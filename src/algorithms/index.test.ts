import { expect, test } from 'vitest';
import { RemoveIdenticalLettersStream, maximumOddSum, removeIdenticalLetters } from '.';

import fs from 'fs';
import path from 'path';

// removeIdenticalLetters

test('"ffdttttyy" should return "ffdtttyy"', () => {
    expect(removeIdenticalLetters('ffdttttyy')).toBe('ffdtttyy');
});

test('"iiikigggg" should return "iiikiggg"', () => {
    expect(removeIdenticalLetters('iiikigggg')).toBe('iiikiggg');
});

test('"iiikiggggffdttttyy" should return "iiikigggffdtttyy"', () => {
    expect(removeIdenticalLetters('iiikiggggffdttttyy')).toBe('iiikigggffdtttyy');
});

test('"big-string-solution.txt should contain "AAABBBCCCDDD"', async () => {
    const input = fs.createReadStream(path.join(__dirname, 'big-string.txt'), { highWaterMark: 1024 });
    const output = fs.createWriteStream(path.join(__dirname, 'big-string-solution.txt'), { flags: 'w' });
    const transformer = new RemoveIdenticalLettersStream();

    await new Promise((resolve, reject) => {
        input.pipe(transformer).pipe(output).on('finish', resolve).on('error', reject);
    });

    const outputFileContents = fs.readFileSync(path.join(__dirname, 'big-string-solution.txt'), 'utf8');
    expect(outputFileContents).toBe('AAABBBCCCDDD');
});

// maximumOddSum

test('[19, 2, 42, 18] should return 61', () => {
    expect(maximumOddSum([19, 2, 42, 18])).toBe(61);
});

test('[61, 32, 51] should return 93', () => {
    expect(maximumOddSum([61, 32, 51])).toBe(93);
});
