const removeIdenticalLetters = (str: string): string => {
    return str.replace(/(.)\1\1\1/g, '$1$1$1');
};

const maximumOddSum = (numbers: number[]): number => {
    return 0;
};

import { Transform, TransformCallback } from 'stream';

class RemoveIdenticalLettersStream extends Transform {
    private previousChar = '';
    private repeatCount = 0;

    constructor() {
        super();
    }

    _transform(chunk: Buffer, _encoding: BufferEncoding, callback: TransformCallback) {
        const str = chunk.toString();
        let result = '';
        // Start processing from the first character
        let startIndex = 0;

        if (this.previousChar === str[0]) {
            // Continue the count from previous chunk
            startIndex = 1;
        }

        for (let i = startIndex; i < chunk.length; i++) {
            const char = str[i];

            if (char === this.previousChar) {
                this.repeatCount++;

                if (this.repeatCount < 4) {
                    result += char;
                }
            } else {
                this.repeatCount = 1;
                result += char;
            }
            this.previousChar = char;
        }
        this.push(result);
        callback();
    }

    _flush(callback: TransformCallback) {
        this.previousChar = '';
        this.repeatCount = 0;
        callback();
    }
}

export { removeIdenticalLetters, maximumOddSum, RemoveIdenticalLettersStream };
