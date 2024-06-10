"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
/**
 * Read the content of a local file
 *
 * @param {string} _path
 * @return {Promise<string>}
 */
async function readLocalFile(_path) {
    const pathToRead = path_1.default.resolve(_path);
    try {
        const content = await promises_1.default.readFile(pathToRead, 'utf-8');
        return content.trim();
    }
    catch (error) {
        return Promise.reject(`Can\'t read the provided file at "${pathToRead}"`);
    }
}
/**
 * Read the content of a remote file by fetching it
 *
 * @param {string} _url
 * @return {Promise<string>}
 */
async function readWebFile(_url) {
    const errorMsg = `Can\'t read the provided file at "${_url}"`;
    try {
        const response = await fetch(_url);
        if (!response.ok) {
            return Promise.reject(errorMsg);
        }
        return await response.text();
    }
    catch (error) {
        return Promise.reject(errorMsg);
    }
}
/**
 * Read the content of a file based on its path or URL
 *
 * @param {string} urlOrPath
 * @return {Promise<string>}
 */
async function readFile(urlOrPath) {
    // read file from web
    if (urlOrPath.startsWith('http')) {
        return readWebFile(urlOrPath);
    }
    // read file from local
    return readLocalFile(urlOrPath);
}
exports.readFile = readFile;
//# sourceMappingURL=fileReader.js.map