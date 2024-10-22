import { useParams } from 'react-router-dom'
import { getPost } from '../../services/post';
import { useQuery } from 'react-query';
import PostContainer from '../../components/post/PostContainer';
import {  getComments } from '../../services/comment';

const Post = () => {
    const id = useParams().id
    const { data:comments, isLoading: commentLoading, refetch: refetchComment} = useQuery(
        ['comment', { postId: id}], getComments
    );
    const { data } = useQuery(
        ['post', { id }],
        getPost,
        // {
        //   keepPreviousData: true, 
        // }
    );
  
    if(commentLoading) return <>Loading...</>

    return (
        <section className="w-full overflow-x-visible h-screen  overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 md:ml-[30rem]">
            <div className='w-full md:w-[50%] flex flex-col items-center gap-2'>
                <PostContainer {...{ data, isParent: true }} />
                {
                    comments.data && comments.data.map(
                        comment => (
                            <div key={comment.id} className='w-full flex justify-end'>
                                {<PostContainer {...{isParent: false, data: comment, refetchComment}}/>}
                            </div>
                        )
                    )
                }
            </div>
        </section>
    )
}

export default Post