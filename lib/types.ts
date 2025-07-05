export interface BlogPost {
  slug: string
  title: string
  description: string
  publishDate: string
  author: string
  tags: string[]
  image?: string
  content?: string
}

export interface BlogPostMetadata {
  title: string
  description: string
  publishDate: string
  author: string
  tags: string[]
  image?: string
} 