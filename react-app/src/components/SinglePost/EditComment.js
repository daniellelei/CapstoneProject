import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as commentActions from '../../store/comment';

const EditComment = ({comment, setShowEdit}) => {

    const dispatch = useDispatch();
    const user = useSelector((state)=>state.session.user)
    const [commentBody, setCommentBody] = useState(comment.commentBody)
    const [commentBodyLength, setCommentBodyLength] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
     useEffect(()=>{
        const err = {}
        if(!commentBody.length) err.commentBody = '* Content is required.'
        if(commentBody.length <=3) err.commentBody = '* The min length is 3.'
        if(commentBody.length > 255) err.commentBody = '* The max length is 255.'
        setErrors(err)
    }, [commentBody])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        const formData = new FormData();
        formData.append('commentBody', commentBody)
        if(!Boolean(Object.values(errors).length)) {
            const editedRes = await dispatch(commentActions.updateCommentThunk(formData, comment.id))
            if(!editedRes.errors) {
                await setHasSubmitted(false);
                setShowEdit(false)
            }
        }


    }
    const maxLengthClassHandler = (count) => {
            if(count === 255) return "showCharacterLength reachedMax"
            return "showCharacterLength";
    }

    return (
        <div>
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
                <button type="submit">Update</button>
            </form>
        </div>
    )

}

export default EditComment;