/* eslint-disable react-hooks/rules-of-hooks */
import { useParams } from 'react-router-dom'
import { getPost } from '../../services/post';
import { useQuery } from 'react-query';
import PostContainer from '../../components/post/PostContainer';
import { getComments } from '../../services/comment';
import BackButton from '../../components/buttons/BackButton';
import LoadingSpinner from '../../components/LoadingSpinner';
import CommentField from './CommentField';
import { useEffect, useState } from 'react';
import Comment from '../../components/post/Comment';

const Post = () => {
    const id = useParams().id
    const { data: comments, isLoading: commentLoading } = useQuery(
        ['comment', { postId: id }], getComments
    );
    const [showCommentField, setShowCommentField] = useState(false)
    const [commentState, setCommentState] = useState({})
    const { data, isLoading: postLoading } = useQuery(
        ['post', { id }],
        () => getPost(id),
        // {
        //   keepPreviousData: true, 
        // }
    );
    
    useEffect(() => {
        const commentFieldState = {}
        comments?.data?.forEach((post) => {
            commentFieldState[post.id] = false
        })
        setCommentState(commentFieldState)
    }, [comments, commentLoading])
    
    if (postLoading || commentLoading || !data) {
        return <LoadingSpinner  {...{isLoading: postLoading || commentLoading}}/>
    }
    return (
        <section className="w-full overflow-x-visible h-screen  overflow-y-scroll p-4 md:p-8 pb-40 md:pb-48 md:ml-[20rem]">
            <BackButton />
            <div className='w-full md:w-[50%] flex flex-col items-center gap-2'>
                <PostContainer {...{ data, isParent: true }} />
                <CommentField {...{ post: data, commentState, showCommentField, setShowCommentField, parentId: id}} />
                {
                    <Comment comments={comments}/>
                }
            </div>
        </section>
    )
}

export default Post