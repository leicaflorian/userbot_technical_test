import { FileParser } from '../src/FileParser'

describe('File parser', () => {
  const fileParser = FileParser.instance
  
  beforeAll(async () => {
    await fileParser.parseFile('tests/demoTestFile')
  })
  
  it('should return words', async () => {
    expect(fileParser.words).toStrictEqual(['Lorem', 'Ipsum', 'è', 'un', 'testo', 'segnaposto', 'utilizzato', 'nel', 'settore', 'della', 'tipografia', 'e', 'della', 'stampa', 'Lorem', 'Ipsum', 'è', 'considerato', 'il', 'testo', 'segnaposto', 'standard', 'sin', 'dal', 'sedicesimo', 'secolo', 'di', 'quando', 'un', 'anonimo', 'tipografo', 'prese', 'una', 'cassetta', 'di', 'caratteri', 'e', 'li', 'assemblò', 'per', 'preparare', 'un', 'testo', 'campione', 'È', 'sopravvissuto', 'non', 'solo', 'a', 'più', 'di', 'cinque', 'secoli', 'ma', 'anche', 'al', 'passaggio', 'alla', 'videoimpaginazione', 'pervenendoci', 'sostanzialmente', 'inalterato', 'Fu', 'reso', 'popolare', 'negli', 'anni', '60', 'con', 'la', 'diffusione', 'dei', 'fogli', 'di', 'caratteri', 'trasferibili', 'Letraset', 'che', 'contenevano', 'passaggi', 'del', 'Lorem', 'Ipsum', 'e', 'più', 'recentemente', 'da', 'software', 'di', 'impaginazione', 'come', 'Aldus', 'PageMaker','di', 'che', 'includeva', 'versioni', 'del', 'Lorem','di', 'Ipsum'])
  })
  
  it('should return words counter', async () => {
    expect(fileParser.wordsCount).toBe(101)
  })
  
  it('should return spaces counter', async () => {
    expect(fileParser.spacesCount).toBe(104)
  })
  
  it('should return symbols counter', async () => {
    expect(fileParser.symbolsCount).toBe(15)
  })
  
  it('should return spaces counter', async () => {
    FileParser.repeatedWordsLimit = 2
    
    expect(fileParser.repeatedWords).toEqual({ 'Ipsum': 4, 'Lorem': 4, 'di': 7, 'e': 3, 'testo': 3, 'un': 3 })
  })
  
  it('should return lettersCount without spaces or symbols', async () => {
    FileParser.repeatedWordsLimit = 2
    
    expect(fileParser.getLettersCount()).toBe(561)
  })
  
  it('should return lettersCount without spaces but including symbols', async () => {
    FileParser.repeatedWordsLimit = 2
    
    expect(fileParser.getLettersCount(false, true)).toBe(576)
  })
  
  it('should return lettersCount without symbols but including spaces', async () => {
    FileParser.repeatedWordsLimit = 2
    
    expect(fileParser.getLettersCount(true, false)).toBe(665)
  })
})
