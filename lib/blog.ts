import fs from 'fs'
import path from 'path'
import { BlogPost } from './types'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export async function getAllPosts(): Promise<BlogPost[]> {
  // Get all mdx files from content/posts directory
  const fileNames = fs.readdirSync(postsDirectory)
  const posts: BlogPost[] = []

  for (const fileName of fileNames) {
    if (fileName.endsWith('.mdx')) {
      const slug = fileName.replace(/\.mdx$/, '')
      const post = await getPostBySlug(slug)
      if (post) {
        posts.push(post)
      }
    }
  }

  // Sort posts by date in descending order
  return posts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { metadata } = await import(`@/content/posts/${slug}.mdx`)
    
    return {
      slug,
      title: metadata.title,
      description: metadata.description,
      publishDate: metadata.publishDate,
      author: metadata.author,
      tags: metadata.tags,
      image: metadata.image,
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}

export async function getPostSlugs(): Promise<string[]> {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => fileName.replace(/\.mdx$/, ''))
} 

export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts()
  return allPosts.filter(post => 
    post.tags.some(postTag => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  )
}

export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts()
  const tagSet = new Set<string>()
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag))
  })
  
  return Array.from(tagSet).sort()
} 