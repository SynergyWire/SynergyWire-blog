import { PostPreview } from '@/components/PostPreview'
import { List } from '@/components/list'
import { PostMetaData } from '@/interfaces/PostMetaData'
import getPostMetaData from '@/utils/getPostMetaData'

const Page = function () {
  const postMetaData = getPostMetaData()

  const renderPostPreviews = (posts: PostMetaData[]) => posts.map(post => (
    <PostPreview key={post.slug} {...post} />
  ))

  const shouldShowAllPost = postMetaData.length > 4
  return (
    <div>
      <List type="highlight" title="Recent posts">
        {renderPostPreviews(shouldShowAllPost ? postMetaData.slice(0, 4) : postMetaData)}
      </List>
      {shouldShowAllPost && (
        <List title="All posts" style={{marginTop: '50px'}}>
          {renderPostPreviews(postMetaData.slice(4, postMetaData.length))}
        </List>
      )}
    </div>
  )
}

export default Page