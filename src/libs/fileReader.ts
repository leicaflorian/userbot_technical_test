import path from 'path'
import fs from 'fs/promises'

/**
 * Read the content of a local file
 *
 * @param {string} _path
 * @return {Promise<string>}
 */
async function readLocalFile (_path: string): Promise<string> {
  const pathToRead = path.resolve(_path)
  
  try {
    const content = await fs.readFile(pathToRead, 'utf-8')
    
    return content.trim()
  } catch (error) {
    return Promise.reject(`Can\'t read the provided file at "${pathToRead}"`)
  }
}

/**
 * Read the content of a remote file by fetching it
 *
 * @param {string} _url
 * @return {Promise<string>}
 */
async function readWebFile (_url: string): Promise<string> {
  const errorMsg = `Can\'t read the provided file at "${_url}"`
  
  try {
    const response = await fetch(_url)
    
    if (!response.ok) {
      return Promise.reject(errorMsg)
    }
    
    return await response.text()
  } catch (error) {
    return Promise.reject(errorMsg)
  }
}

/**
 * Read the content of a file based on its path or URL
 *
 * @param {string} urlOrPath
 * @return {Promise<string>}
 */
export async function readFile (urlOrPath: string): Promise<string> {
  // read file from web
  if (urlOrPath.startsWith('http')) {
    return readWebFile(urlOrPath)
  }

  // read file from local
  return readLocalFile(urlOrPath)
}
