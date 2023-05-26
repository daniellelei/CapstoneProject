import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as commentActions from '../../store/comment';
import EditComment from './EditComment';

const Comments = ({post}) => {
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.session.user)
    const [commentBody, setCommentBody] = useState('');
    const [commentBodyLength, setCommentBodyLength] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const commentsObj = useSelector(state=>state.comments.postComments)
    console.log('commentsObj', commentsObj)
    const [showEdit, setShowEdit] = useState(false)

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

    const clickEdit = (e) => {
        e.preventDefault();
        setShowEdit(true);
    }
    const clickDelete = (e)=> {
        e.preventDefault();
        
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
                    <div className='eaComment' key={comment.id}>
                        <img 
                            style={{height:"40px",width:"40px",borderRadius:"50%"}}
                            src={comment.user.profilePic} alt="user_profile_pic"/>
                        <div className='userInfo'>
                            <div className='comment_name_date'>
                                <p style={{fontWeight:"bolder"}}>{comment.user.username}</p>
                                <p style={{fontSize:"12px",marginLeft:'10px',color:"grey"}}>{new Date(comment.dateTime).toDateString()}</p>
                            </div>
                            <p className='userInfoP'>{comment.commentBody}</p>
                        </div>
                        <div>
                            {comment.user.id === user.id ? (
                                <div>
                                    <button onClick={clickEdit}>Edit</button>
                                    <button onClick={clickDelete}>Delete</button>
                                </div>
                            ) : null}
                        </div>
                        {showEdit && comment.user.id === user.id? (
                            <div>
                                <EditComment comment={comment} setShowEdit={setShowEdit}/>
                            </div>
                        ) : (null)}
                        
                    </div>
                ))}
            </div>
        </div>
    )


}

export default Comments;