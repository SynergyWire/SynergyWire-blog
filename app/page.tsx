import PostPreview from '@/components/PostPreview'
import getPostMetaData from '@/utils/getPostMetaData'

const Page = function () {
  const postMetadData = getPostMetaData()

  const postPreviews = postMetadData.map(post => (
    <PostPreview key={post.slug} {...post} />
  ))

  return (
    <div className="grid grid-cols-1 gap-4">{postPreviews}</div>
  )
}

export default Page