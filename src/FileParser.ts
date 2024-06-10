import { readFile } from './libs/fileReader'

/**
 * The FileParser class is responsible for parsing the content of a file
 * and returning some information about it
 *
 * The class is a singleton, so it can be accessed through the "instance" static property
 * Obviously, there is no real need to use the Singleton Pattern here, but it's just as an example
 */
export class FileParser {
  /**
   * The limit of repeated words that will be used in the "repeatedWords" get property
   */
  static #repeatedWordsLimit = 10
  
  /**
   * The instance of the FileParser class
   */
  static #instance: FileParser
  
  /**
   * The content of the file
   */
  #fileContent = ''
  
  #wordsRegex = '\\w-òàùèéì'
  
  // ************************************************************************
  // STATIC METHODS
  // ************************************************************************
  
  /**
   * Returns the instance of the FileParser class as a singleton
   * If no instance is found, a new one is created
   *
   * @return {FileParser}
   */
  public static get instance (): FileParser {
    if (!this.#instance) {
      this.#instance = new FileParser()
    }
    
    return this.#instance
  }
  
  /**
   * Returns the limit of repeated words
   *
   * @return {number}
   */
  public static get repeatedWordsLimit (): number {
    return this.#repeatedWordsLimit
  }
  
  /**
   * Sets the limit of repeated words
   *
   * @param {number} value
   */
  public static set repeatedWordsLimit (value: number) {
    // validate the value ensuring that it's a number and is greater than 1
    if (!value || typeof value !== 'number' || value < 2) {
      throw new Error('The repeated words limit must be a number greater than 1')
    }
    
    this.#repeatedWordsLimit = value
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
  public async parseFile (filePath: string): Promise<any> {
    this.#fileContent = await readFile(filePath)
    
    return this.#fileContent
  }
  
  /**
   * Returns the list of words in the file
   *
   * @return {string[]}
   */
  public get words (): string[] {
    const regex = new RegExp(`[${this.#wordsRegex}]+`, 'gi')
    const words = this.#fileContent.match(regex)
    
    return words.reduce((acc, word) => {
      // Ensure that the word is not empty
      const text = word.trim()
      
      // store the word if it's not empty
      if (text) {
        acc.push(text)
      }
      
      return acc
    }, [] as string[])
  }
  
  /**
   * Returns the number of words in the file
   *
   * @return {number}
   */
  public get wordsCount (): number {
    return this.words.length
  }
  
  /**
   * Returns the number of spaces in the file
   *
   * @return {number}
   */
  public get spacesCount (): number {
    return this.#fileContent.match(/\s/g).length
  }
  
  /**
   * Returns the number of symbols in the file
   *
   * @return {number}
   */
  public get symbolsCount (): number {
    const regex = new RegExp(`[^\\s${this.#wordsRegex}]`, 'gi')
    
    return this.#fileContent.match(regex).length
  }
  
  /**
   * Returns the list of repeated words in the file
   *
   * @return {Record<string, number>}
   */
  public get repeatedWords (): Record<string, number> {
    const words = this.words
    const wordsCounter = {}
    
    words.forEach((word) => {
      if (!wordsCounter[word]) {
        wordsCounter[word] = 0
      }
      
      wordsCounter[word] = wordsCounter[word] + 1
    })
    
    return words.reduce((acc, word) => {
      const count = wordsCounter[word]
      
      if (count > FileParser.repeatedWordsLimit) {
        acc[word] = count
      }
      
      return acc
    }, {} as Record<string, number>)
  }
  
  /**
   * Returns the number of letters in the file
   *
   * @param {boolean} includeSpaces Include spaces in the count of letters
   * @param {boolean} includeSymbols Include symbols in the count of letters
   * @return {number}
   */
  public getLettersCount (includeSpaces?: boolean, includeSymbols?: boolean): number {
    let toReturn = 0
    
    if (includeSpaces) {
      toReturn += this.spacesCount ?? 0
    }
    
    if (includeSymbols) {
      toReturn += this.symbolsCount ?? 0
    }
    
    // removes all spaces and split the content into an array of characters
    toReturn += this.#fileContent.match(new RegExp(`[${this.#wordsRegex}]`, 'gi')).length
    
    return toReturn
  }
}
