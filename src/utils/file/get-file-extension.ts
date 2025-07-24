const DOCX_TYPE =
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
const DOC_TYPE = 'application/msword'
const JPEG_TYPE = 'image/jpeg'
const JPG_TYPE = 'image/jpg'
const IMAGE_TYPE = 'image/'
const PNG_TYPE = 'image/png'
const PDF_TYPE = 'application/pdf'

export function getFileExtension(fileType: string): string | null {
  switch (fileType) {
    case PDF_TYPE:
      return 'pdf'
    case DOCX_TYPE:
      return 'docx'
    case DOC_TYPE:
      return 'doc'
    case JPEG_TYPE:
      return 'jpeg'
    case JPG_TYPE:
      return 'jpg'
    case PNG_TYPE:
      return 'png'
    case fileType.startsWith(IMAGE_TYPE) ? fileType : null:
      return 'image'
    default:
      return null
  }
}
