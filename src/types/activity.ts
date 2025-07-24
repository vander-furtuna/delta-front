export type ActivityStatus = 'PENDING' | 'OVERDUE' | 'COMPLETED'
export type ActivityType = 'QUIZ' | 'EXERCISE' | 'CHALLENGE' | 'LIST'

export type ActivityFilesDTO = unknown | null

export type File = {
  id: number
  fileName: string
  fileType: string
  filePath: string
  size: number
}

export type Link = {
  link: string
  description: string
}

export type Activity = {
  id: number
  title: string
  description: string
  activityType: ActivityType
  imageUrl: string
  difficultyLevel: number
  maxScore: number
  status: ActivityStatus
  deadline: string
  completed: boolean
  completionTimestamp: string
  files: File[]
  links: Link[]
}

export type Sort = {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export type Pageable = {
  pageNumber: number
  pageSize: number
  sort: Sort
  offset: number
  paged: boolean
  unpaged: boolean
}

export type SearchActivitiesResponse = {
  content: Activity[]
  pageable: Pageable
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: Sort
  numberOfElements: number
  first: boolean
  empty: boolean
}
