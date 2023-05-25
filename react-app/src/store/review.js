const LOAD_REVIEW = 'reviews/load';
const CREATE_REVIEW = 'reviews/create'
const UPDATE_REVIEW = 'reviews/update';
const REMOVE_REVIEW = 'reviews/delete';

export const actionLoadReview = (reviews) => {
    return {
        type: LOAD_REVIEW,
        reviews
    }
}

export const actionCreateReview = (review) => {
    return {
        type:CREATE_REVIEW,
        review
    }
}

export const actionUpdateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}

export const actionRemoveReview = (id) => {
    return {
        type: REMOVE_REVIEW,
        id
    }
}

export const loadReviewThunk = (id) => async (dispatch) => {
    const response = await fetch (`/api/posts/${id}/reviews`)
    if(response.ok) {
        const reviewRes = await response.json();
        dispatch(actionLoadReview(reviewRes))
        return reviewRes;
    }
}

export const createReviewThunk = (review, id) => async (dispatch) => {
    const response = await fetch (`/api/posts/${id}/reviews`, {
        methods:'POST',
        body:review
    });
    if(response.ok) {
        const newReview = await response.json();
        await dispatch(actionCreateReview(newReview));
        return newReview;
    }
    return response.json();
}

export const updateReviewThunk = (review, reviewId) => async (dispatch)=>{
    const response = await fetch(`/api/reviews/${reviewId}`, {
        methods: 'PATCH',
        body: review
    });
    if(response.ok) {
        const updatedReview = await response.json();
        await dispatch(actionUpdateReview(updatedReview));
        return updatedReview;
    }
    return response.json();
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        methods:'DELETE'
    });
    if(response.ok) {
        await dispatch(actionRemoveReview(reviewId))
        return await response.json()
    }
    return await response.json()
};

const initialState ={
    postReviews:{},
}

const reviewReducer = (state=initialState, action)=>{
    switch(action.type) {
        case LOAD_REVIEW:
            const allReviews={};
            action.reviews.forEach((r)=>{
                allReviews[r.id] = r;
            })
            return {...state, postReviews:{...allReviews}};
        case CREATE_REVIEW:
            return {
                ...state,
                postReviews:{...state.postReviews, [action.review.id]:action.review}
            }
        case UPDATE_REVIEW:
            return {
                ...state,
                postReviews:{...state.postReviews,[action.review.id]: action.review}
            }
        case REMOVE_REVIEW:
            const newPostReview = {...state};
            delete newPostReview.postReviews[action.reviewId];
            return newPostReview;
        default:
            return state;
    }
}

export default reviewReducer;