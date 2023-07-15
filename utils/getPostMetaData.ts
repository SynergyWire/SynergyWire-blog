import fs from 'fs'
import { FOLDER_BLOG_PATH } from '@/constants'
import matter from 'gray-matter'
import { PostMetaData } from '@/interfaces/PostMetaData'

export default function getPostMetaData(): PostMetaData[] {
  const files = fs.readdirSync(FOLDER_BLOG_PATH)

  return files.filter(file => file.endsWith('.md')).map(fileName => {
    const fileContent = fs.readFileSync(`${FOLDER_BLOG_PATH}${fileName}`, 'utf8')
    const matterResult = matter(fileContent)

    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      subtitle: matterResult.data.subtitle,
      tags: matterResult.data.tags,
      slug: fileName.replace('.md', ''),
    }
  })
}
