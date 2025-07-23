export function getFileName(fileName: string): string {
  const parts = fileName.split('@')
  return parts.length > 1 ? parts[1] : fileName
}
