import { useParams } from 'react-router-dom'
import { getPost } from '../../services/post';
import { useQuery } from 'react-query';
import PostContainer from '../../components/post/PostContainer';

const Post = () => {
    const id = useParams().id
    const { data } = useQuery(
        ['post', { id }],
        () => getPost(id),
        // {
        //   keepPreviousData: true, 
        // }
    );

    // const { comments } = useQuery(
    //     ['comment', { postId:  }],
    //     () => getAllComments(id),
    //     // {
    //     //   keepPreviousData: true, 
    //     // }
    // );
    return (
        <section className="w-full overflow-x-visible h-screen  overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 md:ml-[30rem]">
            <div className='w-full md:w-[50%] flex flex-col items-center gap-2'>
                <PostContainer {...{ data, isParent: true }} />
                <PostContainer {...{ data, isParent: false }} />
                <PostContainer {...{ data, isParent: false }} />
            </div>
        </section>
    )
}

export default Post