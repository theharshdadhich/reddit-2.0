import { db } from '@/lib/db'
import PostFeed from '../PostFeed'
import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'

const GeneralFeed = async () => {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        votes: true,
        author: true,
        comments: true,
        subreddit: true,
      },
      take: INFINITE_SCROLL_PAGINATION_RESULTS, // 4 for demo, should be higher in production
    })

    return <PostFeed initialPosts={posts} />
  } catch (error) {
    console.error('Error fetching posts:', error)
    // Handle the error gracefully
    return <div>Unable to load posts. Please try again later.</div>
  }
}

export default GeneralFeed
