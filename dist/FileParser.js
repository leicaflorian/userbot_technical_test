"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _FileParser_repeatedWordsLimit, _FileParser_instance, _FileParser_fileContent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileParser = void 0;
const fileReader_1 = require("./libs/fileReader");
class FileParser {
    constructor() {
        /**
         * The content of the file
         */
        _FileParser_fileContent.set(this, ''
        // ************************************************************************
        // STATIC METHODS
        // ************************************************************************
        /**
         * Returns the instance of the FileParser class as a singleton
         * If no instance is found, a new one is created
         *
         * @return {FileParser}
         */
        );
    }
    // ************************************************************************
    // STATIC METHODS
    // ************************************************************************
    /**
     * Returns the instance of the FileParser class as a singleton
     * If no instance is found, a new one is created
     *
     * @return {FileParser}
     */
    static get instance() {
        if (!__classPrivateFieldGet(this, _a, "f", _FileParser_instance)) {
            __classPrivateFieldSet(this, _a, new _a(), "f", _FileParser_instance);
        }
        return __classPrivateFieldGet(this, _a, "f", _FileParser_instance);
    }
    /**
     * Returns the limit of repeated words
     *
     * @return {number}
     */
    static get repeatedWordsLimit() {
        return __classPrivateFieldGet(this, _a, "f", _FileParser_repeatedWordsLimit);
    }
    /**
     * Sets the limit of repeated words
     *
     * @param {number} value
     */
    static set repeatedWordsLimit(value) {
        // validate the value ensuring that it's a number and is greater than 1
        if (!value || typeof value !== 'number' || value < 2) {
            throw new Error('The repeated words limit must be a number greater than 1');
        }
        __classPrivateFieldSet(this, _a, value, "f", _FileParser_repeatedWordsLimit);
    }
    // ************************************************************************
    // INSTANCE METHODS
    // ************************************************************************
    /**
     * Parses the content of a file, stores and returns it
     *
     * @param {string} filePath
     * @return {Promise<any>}
     */
    async parseFile(filePath) {
        __classPrivateFieldSet(this, _FileParser_fileContent, await (0, fileReader_1.readFile)(filePath), "f");
        return __classPrivateFieldGet(this, _FileParser_fileContent, "f");
    }
    /**
     * Returns the list of words in the file
     *
     * @return {string[]}
     */
    get words() {
        return __classPrivateFieldGet(this, _FileParser_fileContent, "f").match(/[\w-]*/g)
            .reduce((acc, word) => {
            // Ensure that the word is not empty
            const text = word.trim();
            // store the word if it's not empty
            if (text) {
                acc.push(text);
            }
            return acc;
        }, []);
    }
    /**
     * Returns the number of words in the file
     *
     * @return {number}
     */
    get wordsCount() {
        return this.words.length;
    }
    /**
     * Returns the number of spaces in the file
     *
     * @return {number}
     */
    get spacesCount() {
        return __classPrivateFieldGet(this, _FileParser_fileContent, "f").split(' ').length - 1;
    }
    /**
     * Returns the number of symbols in the file
     *
     * @return {number}
     */
    get symbolsCount() {
        return __classPrivateFieldGet(this, _FileParser_fileContent, "f").match(/[^\w\s]/g).length;
    }
    /**
     * Returns the list of repeated words in the file
     *
     * @return {Record<string, number>}
     */
    get repeatedWords() {
        const words = this.words;
        const wordsCounter = {};
        words.forEach((word) => {
            if (!wordsCounter[word]) {
                wordsCounter[word] = 0;
            }
            wordsCounter[word]++;
        });
        return words.reduce((acc, word) => {
            const count = wordsCounter[word];
            if (count > _a.repeatedWordsLimit) {
                acc[word] = count;
            }
            return acc;
        }, {});
    }
    /**
     * Returns the number of letters in the file
     *
     * @param {boolean} includeSpaces Include spaces in the count of letters
     * @param {boolean} includeSymbols Include symbols in the count of letters
     * @return {number}
     */
    getLettersCount(includeSpaces, includeSymbols) {
        let toReturn = 0;
        if (includeSpaces) {
            toReturn += this.spacesCount ?? 0;
        }
        if (includeSymbols) {
            toReturn += this.symbolsCount ?? 0;
        }
        toReturn += __classPrivateFieldGet(this, _FileParser_fileContent, "f").replaceAll(/\s/g, '').split('').length;
        return toReturn;
    }
}
exports.FileParser = FileParser;
_a = FileParser, _FileParser_fileContent = new WeakMap();
/**
 * The limit of repeated words that will be used in the "repeatedWords" get property
 */
_FileParser_repeatedWordsLimit = { value: 10 };
/**
 * The instance of the FileParser class
 */
_FileParser_instance = { value: void 0 };
//# sourceMappingURL=FileParser.js.map