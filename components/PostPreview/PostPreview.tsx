import Link from 'next/link'
import Image from 'next/image'
import { PostMetaData } from '@/interfaces/PostMetaData'
import './styles.css'

export function PostPreview(props: PostMetaData) {
  console.log(props.tags)
  return (
    <Link href={`/posts/${props.slug}`} className="h-full block">
      <div className="post-preview-card h-full">
        <div className="post-preview-card__image-preview">
          <Image
            className="h-full object-cover" 
            src={props.image} 
            alt={props.title}
            width={500}
            height={500}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div className="post-preview-card__description">
          <p className="text-sm text-slate-500 line-clamp-1 flex items-center">{props.author} <span className="post-preview-card__point-separator" /> {props.date}</p>
          <h2 className="font-bold text-base text-slate-700 hover:underline line-clamp-1">{props.title}</h2>
          <p className="post-preview-card__short-description text-sm text-slate-400 mb-3 line-clamp-2">{props.subtitle}</p>
          <div className="post-preview-card__tags flex flex-wrap">
            {props.tags.split(' ').map(tag => (
              <span key={tag} className="text-xs border-slate-700 text-slate-700 font-bold py-1 px-2 border rounded-2xl mr-2 mt-2">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}