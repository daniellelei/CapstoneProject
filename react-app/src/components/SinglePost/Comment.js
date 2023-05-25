import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as reviewActions from '../../store/review';


const Comment = ({post}) => {
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.session.user)
    const [reviewBody, setReviewBody] = useState('');
    const [reviewBodyLength, setReviewBodyLength] = useState(0);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const reviewsObj = useSelector(state=>state.reviews.postReviews)

    useEffect(()=>{
        dispatch(reviewActions.loadReviewThunk(post.id))

    },[dispatch])

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
        formData.append('post_id', post.id)
        formData.append('user_id', user.id)
        if (!Boolean(Object.values(errors).length)) {
            const createdRes = await dispatch(reviewActions.createReviewThunk(formData, post.id))
            if(!createdRes.errors) {
                await reset();
            } 
        }

    }
    const reset = () => {
        setReviewBody('');
        setReviewBodyLength(0);
        setErrors({});
        setHasSubmitted(false)
    }
    const maxLengthClassHandler = (count) => {
            if(count === 255) return "showCharacterLength reachedMax"
            return "showCharacterLength";
        }
    let reviews;

    if(reviewsObj) {
        reviews = Object.values(reviewsObj);
    }

    return (
        <div>
            <div className='allReviews'>
                {!reviews.length?(
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
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                            )}
                {!reviews.length?null:reviews.map((review)=>(
                    <div className='eaReview' key={review.id}>
                        <img 
                            style={{height:"40px",width:"40px",borderRadius:"50%"}}
                            src={review.user.profilePic} alt="user_profile_pic"/>
                        <div className='userInfo'>
                            <div className='review_name_date'>
                                <p style={{fontWeight:"bolder"}}>{review.user.username}</p>
                                <p style={{fontSize:"12px",marginLeft:'10px',color:"grey"}}>{new Date(review.date).toDateString()}</p>
                            </div>
                            <p className='userInfoP'>{review.reviewBody}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )


}

export default Comment;