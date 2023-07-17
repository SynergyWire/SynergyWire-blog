import Link from 'next/link'
import { PostMetaData } from '@/interfaces/PostMetaData'
import './styles.css'

export function PostPreview(props: PostMetaData) {
  return (
    <Link href={`/posts/${props.slug}`} className="h-full block">
      <div className="post-preview-card h-full">
        <div className="post-preview-card__image-preview">
          <img className="h-full object-cover" src={props.image} alt={props.title} />
        </div>
        <div className="post-preview-card__description">
          <p className="text-sm text-slate-500">{props.author} {props.date}</p>
          <h2 className="font-bold text-base text-slate-700 hover:underline">{props.title}</h2>
          <p className="text-sm text-slate-400 mb-3 line-clamp-2">{props.subtitle}</p>
          <div className="flex overflow-x-scroll scroll-p-0 no-scollbar">
            {props.tags.split(' ').map(tag => (
              <span key={tag} className="text-xs border-slate-700 text-slate-700 font-bold py-1 px-2 border rounded-2xl mr-2 mb-1">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}