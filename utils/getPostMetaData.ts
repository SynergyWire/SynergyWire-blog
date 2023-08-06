import fs from 'fs'
import { FOLDER_BLOG_PATH } from '@/constants'
import matter from 'gray-matter'
import { PostMetaData } from '@/interfaces/PostMetaData'

export default function getPostMetaData(): PostMetaData[] {
  const files = fs.readdirSync(FOLDER_BLOG_PATH)

  return files.filter(file => file.endsWith('.md')).map(fileName => {
    const fileContent = fs.readFileSync(`${FOLDER_BLOG_PATH}${fileName}`, 'utf8')
    const matterResult = matter(fileContent)
    const slug = fileName.replace('.md', '')
    const previewImageRoute = `/images/articles/${slug}/preview.jpg`
    const isThereImagePreview = fs.existsSync(`public${previewImageRoute}`)

    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      subtitle: matterResult.data.subtitle,
      tags: matterResult.data.tags,
      author: matterResult.data.author,
      image: isThereImagePreview ? previewImageRoute : '/images/default-image-post-preview.jpg',
      slug
    }
  }).sort((postA, postB) => new Date(postB.date).getTime() - new Date(postA.date).getTime())
}
