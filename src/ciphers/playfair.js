export const playfairCipher = {
    createMatrix(key) {
        const alphabet = 'ABCDEFGHIKLMNOPQRSTUVWXYZ'; // Note: I and J are combined
        const matrix = [];
        const usedChars = new Set();
        
        // Add key characters first
        key.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I').split('').forEach(char => {
            if (!usedChars.has(char)) {
                usedChars.add(char);
                matrix.push(char);
            }
        });

        // Add remaining alphabet
        alphabet.split('').forEach(char => {
            if (!usedChars.has(char)) {
                usedChars.add(char);
                matrix.push(char);
            }
        });

        // Convert to 5x5 matrix
        const grid = [];
        for (let i = 0; i < 5; i++) {
            grid.push(matrix.slice(i * 5, (i + 1) * 5));
        }
        return grid;
    },

    findPosition(matrix, char) {
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                if (matrix[row][col] === char) {
                    return { row, col };
                }
            }
        }
        return null;
    },

    preparePairs(text) {
        const pairs = [];
        let i = 0;
        
        text = text.toUpperCase().replace(/[^A-Z]/g, '').replace(/J/g, 'I');
        
        while (i < text.length) {
            if (i === text.length - 1) {
                pairs.push(text[i] + 'X');
                break;
            }
            
            if (text[i] === text[i + 1]) {
                pairs.push(text[i] + 'X');
                i++;
            } else {
                pairs.push(text[i] + text[i + 1]);
                i += 2;
            }
        }
        
        return pairs;
    },

    encrypt(text, key) {
        const matrix = this.createMatrix(key);
        const pairs = this.preparePairs(text);
        
        return pairs.map(pair => {
            const pos1 = this.findPosition(matrix, pair[0]);
            const pos2 = this.findPosition(matrix, pair[1]);
            
            if (pos1.row === pos2.row) {
                return matrix[pos1.row][(pos1.col + 1) % 5] +
                       matrix[pos2.row][(pos2.col + 1) % 5];
            }
            
            if (pos1.col === pos2.col) {
                return matrix[(pos1.row + 1) % 5][pos1.col] +
                       matrix[(pos2.row + 1) % 5][pos2.col];
            }
            
            return matrix[pos1.row][pos2.col] +
                   matrix[pos2.row][pos1.col];
        }).join('');
    },

    decrypt(text, key) {
        const matrix = this.createMatrix(key);
        const pairs = this.preparePairs(text);
        
        return pairs.map(pair => {
            const pos1 = this.findPosition(matrix, pair[0]);
            const pos2 = this.findPosition(matrix, pair[1]);
            
            if (pos1.row === pos2.row) {
                return matrix[pos1.row][(pos1.col + 4) % 5] +
                       matrix[pos2.row][(pos2.col + 4) % 5];
            }
            
            if (pos1.col === pos2.col) {
                return matrix[(pos1.row + 4) % 5][pos1.col] +
                       matrix[(pos2.row + 4) % 5][pos2.col];
            }
            
            return matrix[pos1.row][pos2.col] +
                   matrix[pos2.row][pos1.col];
        }).join('');
    },

    displayProcess(text, key) {
        const matrix = this.createMatrix(key);
        const pairs = this.preparePairs(text);
        
        return {
            matrix: matrix,
            pairs: pairs,
            matrixString: matrix.map(row => row.join(' ')).join('\n'),
            pairsString: pairs.join(' ')
        };
    }
};