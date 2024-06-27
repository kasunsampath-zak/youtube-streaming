function caesarCipherEncrypt(text, shift) {
    return text.split('').map(char => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
            return String.fromCharCode(((code - 65 + shift) % 26) + 65); // Uppercase letters
        } else if (code >= 97 && code <= 122) {
            return String.fromCharCode(((code - 97 + shift) % 26) + 97); // Lowercase letters
        } else {
            return char; // Non-alphabet characters
        }
    }).join('');
}

function caesarCipherDecrypt(text, shift) {
    return caesarCipherEncrypt(text, 26 - shift); // Decryption is the same as encryption with 26 - shift
}

module.exports = {
    caesarCipherEncrypt,
    caesarCipherDecrypt
};