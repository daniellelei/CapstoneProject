import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from '../../store/review';

const EditComment = ({review, setShowEdit}) => {

    const dispatch = useDispatch();
    const user = useSelector((state)=>state.session.user)
    const [reviewBody, setReviewBody] = useState(review.reviewBody)
    const [reviewBodyLength, setReviewBodyLength] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
     useEffect(()=>{
        const err = {}
        if(!reviewBody.length) err.reviewBody = '* Content is required.'
        if(reviewBody.length > 255) err.reviewBody = '* The max length is 255.'
        setErrors(err)
    }, [reviewBody])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        const formData = new FormData();
        formData.append('reviewBody', reviewBody)
        if(!Boolean(Object.values(errors).length)) {
            const editedRes = await dispatch(reviewActions.updateReviewThunk(formData, review.id))
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
                    setReviewBody(e.target.value);
                    setReviewBodyLength(e.target.value.length)
                }}
                value = {reviewBody}
                name='reviewBody'
                style={{width:"100%"}}
                type='text'
                placeholder='Leave a comment'
                >
                </input>
                <p className={maxLengthClassHandler(reviewBodyLength)}
                >{reviewBodyLength} /255 characters</p>
                <button type="submit">Update</button>
            </form>
        </div>
    )

}

export default EditComment;