const DOCX_TYPE =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
const DOC_TYPE = 'application/msword'
const IMAGE_TYPE = 'image/'
const PDF_TYPE = 'application/pdf'

export function parseFileType(fileType: string): string | null {
  if (fileType === PDF_TYPE) {
    return 'pdf'
  }
  if ([DOCX_TYPE, DOC_TYPE].includes(fileType)) {
    return 'doc'
  }
  if (fileType.startsWith(IMAGE_TYPE)) {
    return 'image'
  }
  return null
}
