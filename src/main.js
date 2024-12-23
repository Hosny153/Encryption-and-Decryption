import { caesarCipher } from './ciphers/caesar.js';
import { playfairCipher } from './ciphers/playfair.js';
import { vigenereCipher } from './ciphers/vigenere.js';
import { transpositionCipher } from './ciphers/transposition.js';

// Show selected method form
window.showMethod = function(method) {
    // Fade out the currently visible form
    const currentForm = document.querySelector('.method-form:not([style*="display: none"])');
    
    if (currentForm) {
        currentForm.style.animation = 'fadeOut 1s forwards'; // Apply fade-out animation
    }

    // After the fade-out animation is complete, switch the form
    setTimeout(() => {
        // Hide all method forms
        document.querySelectorAll('.method-form').forEach(form => {
            form.style.display = 'none';
        });

        // Show the selected method form
        const selectedForm = document.getElementById(`${method}Form`);
        selectedForm.style.display = 'block';
        
        // Apply fade-in animation
        selectedForm.style.animation = 'fadeIn 1s forwards';
    }, 800); // Wait for the fade-out animation to finish (1 second)
};

// Reset form function
window.resetForm = function(method) {
    document.getElementById(`${method}Text`).value = ''; // Clear the input text
    document.getElementById(`${method}Key`).value = '';  // Clear the key input

    if (method === 'caesar') {
        document.getElementById('caesarShift').value = ''; // Clear Caesar shift input
    }

    document.getElementById(`${method}Result`).innerHTML = ''; // Clear the result display
}

// Caesar Cipher Handler
window.handleCaesar = function(action) {
    const text = document.getElementById('caesarText').value;
    const shift = parseInt(document.getElementById('caesarShift').value);
    const result = action === 'encrypt' 
        ? caesarCipher.encrypt(text, shift)
        : caesarCipher.decrypt(text, shift);
    document.getElementById('caesarResult').textContent = result;
}

// Playfair Cipher Handler
window.handlePlayfair = function(action) {
    const text = document.getElementById('playfairText').value;
    const key = document.getElementById('playfairKey').value;
    
    if (action === 'encrypt') {
        const result = playfairCipher.encrypt(text, key);
        const process = playfairCipher.displayProcess(text, key);
        
        // Display the result and process
        const processDisplay = `Playfair Matrix:
${process.matrixString}

Text Pairs: ${process.pairsString}

Encrypted: ${result}`;
        
        document.getElementById('playfairResult').innerHTML = processDisplay.replace(/\n/g, '<br>');
    } else {
        const result = playfairCipher.decrypt(text, key);
        document.getElementById('playfairResult').textContent = result;
    }
}

// Vigenere Cipher Handler
window.handleVigenere = function(action) {
    const text = document.getElementById('vigenereText').value;
    const key = document.getElementById('vigenereKey').value;
    const result = action === 'encrypt'
        ? vigenereCipher.encrypt(text, key)
        : vigenereCipher.decrypt(text, key);
    document.getElementById('vigenereResult').textContent = result;
}

// Transposition Cipher Handler
window.handleTransposition = function(action) {
    const text = document.getElementById('transpositionText').value;
    const key = document.getElementById('transpositionKey').value;
    
    if (action === 'encrypt') {
        const result = transpositionCipher.encrypt(text, key);
        const process = transpositionCipher.displayProcess(text, key);
        
        // Display the result and process
        const processDisplay = `Key:    ${process.key.join(' ')}
Matrix:
${process.matrixString}

Encrypted: ${result}`;
        
        document.getElementById('transpositionResult').innerHTML = processDisplay.replace(/\n/g, '<br>');
    } else {
        const result = transpositionCipher.decrypt(text, key);
        document.getElementById('transpositionResult').textContent = result;
    }
}

// Open popup for the respective method
document.querySelectorAll('.circle-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        // Find the popup associated with the clicked button
        const method = button.closest('.method-form').id.replace('Form', ''); // Get the method name from the form ID
        const popupBg = document.getElementById(`${method}PopupBg`); // Dynamically find the correct popup background
        
        if (popupBg) {
            popupBg.style.display = 'flex'; // Display the popup
        }
    });
});

// Close popup for each method
document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const popupBg = button.closest('.popup-bg'); // Get the closest popup background element
        if (popupBg) {
            popupBg.style.display = 'none'; // Hide the popup
        }
    });
});

// Close popup when clicking outside the content
document.querySelectorAll('.popup-bg').forEach(popupBg => {
    popupBg.addEventListener('click', (event) => {
        if (event.target === popupBg) {
            popupBg.style.display = 'none'; // Hide the popup when clicking outside
        }
    });
});

// Display the current year dynamically
document.getElementById('current-year').textContent = new Date().getFullYear();
