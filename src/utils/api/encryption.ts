import CryptoJS from 'crypto-js';
import { CONFIG } from '../../constants/config';

const SECRET = CryptoJS.enc.Utf8.parse(CONFIG.SECRET_KEY);
const ENC_IV = CryptoJS.enc.Utf8.parse(CONFIG.IV);

/**
 * Encrypt request body
 */
export const encryptText = (data: any): string => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET, {
        iv: ENC_IV,
    }).toString();
};

/**
 * Decrypt response body
 */
export const decryptText = (ciphertext: any): any => {
    try {
        const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET, { iv: ENC_IV });
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
    } catch (error) {
        console.warn('Decryption failed, returning original data', error);
        return ciphertext;
    }
};
