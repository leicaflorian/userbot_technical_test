import { readFile } from '../src/libs/fileReader'
import { fetch } from './__mocks__/fetch'

beforeEach(() => {
  fetch.mockClear()
})

describe('Read local file', () => {
  it('should throw and error for file not found', async () => {
    return readFile('tests/test.txt').catch((er) => {
      expect(er).toMatch(new RegExp('^Can\'t read the provided file at'))
    })
  })
  
  it('should read content', async () => {
    await expect(readFile('./tests/demoTestFile')).resolves
      .toBe(`Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, di quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker,   di che includeva versioni del Lorem di   Ipsum.`)
  })
})

describe('Read remote file', () => {
  it('should throw and error for remote file not found', async () => {
    fetch.mockRejectedValueOnce(() => Promise.reject())
    
    await expect(readFile('https://filesamples.com/samples/document/txt/sample3.txt'))
      .rejects.toMatch(new RegExp('^Can\'t read the provided file at'))
  })
  
  it('should read content', async () => {
    await expect(readFile('https://filesamples.com/samples/document/txt/sample3.txt')).resolves
      .toBe(`Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, di quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker,   di che includeva versioni del Lorem di   Ipsum.`)
  })
})
