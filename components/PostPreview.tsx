import Link from 'next/link'
import { PostMetaData } from '@/interfaces/PostMetaData'

export default function PostPreview(props: PostMetaData) {

  return (
    <Link href={`/posts/${props.slug}`}>
      <div className="border border-slate-200 p-4 rounded-md shadow-md bg-white">
        <p className="text-sm text-slate-400">{props.date}</p>
        <h2 className="font-bold text-base text-yellow-600 hover:underline">{props.title}</h2>
        <p className="text-sm text-slate-700 my-2">{props.subtitle}</p>
        <p className="text-sm text-yellow-600">{props.tags}</p>
      </div>
    </Link>
  )
}