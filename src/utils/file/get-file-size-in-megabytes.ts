export function getFileSizeInMegabytes(size: number): number {
  const megabytes = size / (1024 * 1024)
  return Math.round(megabytes * 100) / 100
}
