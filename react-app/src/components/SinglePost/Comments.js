import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as commentActions from '../../store/comment';
import EditComment from './EditComment';
import SingleComment from './SingleComment';

const Comments = ({post}) => {
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.session.user)
    const [commentBody, setCommentBody] = useState('');
    const [commentBodyLength, setCommentBodyLength] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const commentsObj = useSelector(state=>state.comments.postComments)
    console.log('commentsObj', commentsObj)
    

    useEffect(()=>{
        dispatch(commentActions.loadCommentThunk(post.id))

    },[dispatch])

    useEffect(()=>{
        const err = {}
        if(!commentBody.length) err.commentBody = '* Content is required.'
        if(commentBody.length > 255) err.commentBody = '* The max length is 255.'
        setErrors(err)
    }, [commentBody])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        const formData = new FormData();
        formData.append('commentBody', commentBody)
        formData.append('post_id', post.id)
        formData.append('user_id', user.id)
        if (!Boolean(Object.values(errors).length)) {
            const createdRes = await dispatch(commentActions.createCommentThunk(formData, post.id))
            if(!createdRes.errors) {
                await reset();
            } 
        }

    }
    const reset = () => {
        setCommentBody('');
        setCommentBodyLength(0);
        setErrors({});
        setHasSubmitted(false)
    }
    const maxLengthClassHandler = (count) => {
            if(count === 255) return "showCharacterLength reachedMax"
            return "showCharacterLength";
    }


    let comments;

    if(commentsObj) {
        comments = Object.values(commentsObj);
    }
    

    return (
        <div>
            <div className='allComments'>
                {!comments.length?(
                    <div style={{marginBottom:"10px"}}>
                        <h2>Comments</h2>
                        <input
                        style={{width:"100%"}}
                        type="text"
                        placeholder='Be the first to leave a comment'
                        ></input>
                    </div>
                ):(
                    <div style={{marginBottom:"10px"}}>
                        <h2>Comments</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                            maxLength={255}
                            onChange={(e)=>{
                                setCommentBody(e.target.value);
                                setCommentBodyLength(e.target.value.length)
                            }}
                            value = {commentBody}
                            name='commentBody'
                            style={{width:"100%"}}
                            type='text'
                            placeholder='Leave a comment'
                            >
                            </input>
                            <p className={maxLengthClassHandler(commentBodyLength)}
                            >{commentBodyLength} /255 characters</p>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                            )}
                {!comments.length?null:comments.map((comment)=>(
                    <SingleComment comment={comment} />
                ))}
            </div>
        </div>
    )


}

export default Comments;