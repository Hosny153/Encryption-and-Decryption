export const transpositionCipher = {
    getKeyOrder(password) {
        // Convert password to array of numbers based on character order
        const chars = password.split('');
        const sorted = [...chars].sort();
        return chars.map(char => sorted.indexOf(char) + 1);
    },

    encrypt(text, password) {
        if (!text || !password) return '';

        // Remove spaces from text for consistent matrix filling
        const cleanText = text.replace(/\s+/g, '');
        
        // Get the key order from password
        const key = this.getKeyOrder(password);
        const cols = key.length;
        
        // Calculate rows needed
        const rows = Math.ceil(cleanText.length / cols);
        
        // Create and fill the matrix
        const matrix = Array(rows).fill().map(() => Array(cols).fill(''));
        let pos = 0;
        
        // Fill matrix row by row
        for (let row = 0; row < rows && pos < cleanText.length; row++) {
            for (let col = 0; col < cols && pos < cleanText.length; col++) {
                matrix[row][col] = cleanText[pos++];
            }
        }

        // Read out columns according to key order
        let result = '';
        for (let i = 1; i <= cols; i++) {
            const col = key.indexOf(i);
            for (let row = 0; row < rows; row++) {
                if (matrix[row][col]) {
                    result += matrix[row][col];
                }
            }
        }

        // For debugging: print the matrix
        console.log('Key:', key.join(' '));
        console.log('Matrix:');
        matrix.forEach(row => console.log(row.join(' ')));
        
        return result;
    },

    decrypt(text, password) {
        if (!text || !password) return '';

        const key = this.getKeyOrder(password);
        const cols = key.length;
        const rows = Math.ceil(text.length / cols);
        const matrix = Array(rows).fill().map(() => Array(cols).fill(''));

        // Calculate characters per column
        const charsPerCol = Math.ceil(text.length / cols);
        let pos = 0;

        // Fill matrix column by column according to key order
        for (let i = 1; i <= cols; i++) {
            const col = key.indexOf(i);
            for (let row = 0; row < rows && pos < text.length; row++) {
                matrix[row][col] = text[pos++];
            }
        }

        // Read matrix row by row
        let result = '';
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (matrix[row][col]) {
                    result += matrix[row][col];
                }
            }
        }

        return result;
    },

    // Helper method to display the encryption process (for educational purposes)
    displayProcess(text, password) {
        const key = this.getKeyOrder(password);
        const cleanText = text.replace(/\s+/g, '');
        const cols = key.length;
        const rows = Math.ceil(cleanText.length / cols);
        const matrix = Array(rows).fill().map(() => Array(cols).fill(''));
        
        let pos = 0;
        for (let row = 0; row < rows && pos < cleanText.length; row++) {
            for (let col = 0; col < cols && pos < cleanText.length; col++) {
                matrix[row][col] = cleanText[pos++];
            }
        }

        return {
            key: key,
            matrix: matrix,
            keyString: key.join(' '),
            matrixString: matrix.map(row => row.join(' ')).join('\n')
        };
    }
};