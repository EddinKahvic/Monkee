import { isDirectory, isFile } from '~/helpers/files.helpers'

describe('isFile', () => {
  it('should return true when called with valid file name', () => {
    const fileName = 'file.ts'

    const actual = isFile(fileName)

    expect(actual).toBeTruthy()
  })

  it('should return false when called with invalid file name', () => {
    const fileName = 'fileWithoutExtension'

    const actual = isFile(fileName)

    expect(actual).toBeFalsy()
  })
})

describe('isDirectory', () => {
  it('should return true when called with valid folder name', () => {
    const folderName = 'someFolder'

    const actual = isDirectory(folderName)

    expect(actual).toBeTruthy()
  })

  it('should return false when called with invalid folder name', () => {
    const folderName = 'file.ts'

    const actual = isDirectory(folderName)

    expect(actual).toBeFalsy()
  })
})
