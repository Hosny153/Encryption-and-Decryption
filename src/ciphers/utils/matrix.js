// Matrix utility functions for cipher operations
export const createMatrix = (rows, cols, fillValue = '') => {
    return Array(rows).fill().map(() => Array(cols).fill(fillValue));
};

export const readByColumns = (matrix, rows, cols) => {
    let result = '';
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows; row++) {
            if (matrix[row][col]) {
                result += matrix[row][col];
            }
        }
    }
    return result;
};

export const readByRows = (matrix, rows, cols) => {
    let result = '';
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (matrix[row][col]) {
                result += matrix[row][col];
            }
        }
    }
    return result;
};