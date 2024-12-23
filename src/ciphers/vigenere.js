export const vigenereCipher = {
    encrypt(text, key) {
        text = text.toUpperCase();
        key = key.toUpperCase();
        let result = '';
        let keyIndex = 0;

        for (let i = 0; i < text.length; i++) {
            if (text[i].match(/[A-Z]/)) {
                const textChar = text.charCodeAt(i) - 65;
                const keyChar = key.charCodeAt(keyIndex % key.length) - 65;
                result += String.fromCharCode(((textChar + keyChar) % 26) + 65);
                keyIndex++;
            } else {
                result += text[i];
            }
        }

        return result;
    },

    decrypt(text, key) {
        text = text.toUpperCase();
        key = key.toUpperCase();
        let result = '';
        let keyIndex = 0;

        for (let i = 0; i < text.length; i++) {
            if (text[i].match(/[A-Z]/)) {
                const textChar = text.charCodeAt(i) - 65;
                const keyChar = key.charCodeAt(keyIndex % key.length) - 65;
                result += String.fromCharCode(((textChar - keyChar + 26) % 26) + 65);
                keyIndex++;
            } else {
                result += text[i];
            }
        }

        return result;
    }
};