import fs from 'fs'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import { FOLDER_BLOG_PATH } from '@/constants'
import getPostMetaData from '@/utils/getPostMetaData'
import { ICON_KEYS } from '@/utils/contants'
import Icon from '@/components/icons/Icon'
import Link from 'next/link'
import { SocialNetworkShare } from '@/utils/socialNetworkShare'

const getPostContent = (slug: string) => {
  return matter(fs.readFileSync(`${FOLDER_BLOG_PATH}${slug}.md`, 'utf8'))
}

export const generateStaticParams = async () => {
  return getPostMetaData().map(post => ({
    slug: post.slug
  }))
}

interface Props {
  params: {
    slug: string
  }
}

export default function PostPage(props: Props) {
  const postContent = getPostContent(props.params.slug)
  const socialNetwork = new SocialNetworkShare({ 
    text: postContent.data.title,
    slug: props.params.slug
  })

  return (
    <article className="prose prose-slate prose-a:text-yellow-600 max-w-3xl prose-quoteless m-auto pt-8 ">
      <div>
        <h1 className="text-slate-800 mb-3">{postContent.data.title}</h1>
        <div className="flex items-center">
          <span className="text-slate-600 font-medium mr-2">Share on:</span>
          <Link 
            className="text-slate-400 mr-2"
            href={socialNetwork.shareWithLinkedin('Luis Santiago')} 
            target="_blank"
            rel="noopener"
          >
            <Icon name={ICON_KEYS.LINKEDIN}/>
          </Link>
          <Link
            className="text-slate-400"
            href={socialNetwork.shareWithTwitter()} 
            target="_blank"
          >
            <Icon name={ICON_KEYS.TWITTER}/>
          </Link>
        </div>
      </div>
      <div className="mt-3">
        <ReactMarkdown components={{
          a: (props) => (
            <a href={props.href} target="_blank">{props.children}</a>
          )
        }}>
          {postContent.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}