const LOAD_COMMENT = 'comments/load';

const CREATE_COMMENT = 'comments/create'
const UPDATE_COMMENT = 'comments/update';
const REMOVE_COMMENT = 'comments/delete';

export const actionLoadComment = (comments) => {
    return {
        type: LOAD_COMMENT,
        comments
    }
}

export const actionCreateComment = (comment) => {
    return {
        type:CREATE_COMMENT,
        comment
    }
}

export const actionUpdateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

export const actionRemoveComment = (id) => {
    return {
        type: REMOVE_COMMENT,
        id
    }
}

export const loadCommentThunk = (id) => async (dispatch) => {
    const response = await fetch (`/api/posts/${id}/comments`)
    if(response.ok) {
        const commentRes = await response.json();
        dispatch(actionLoadComment(commentRes.comments))
        return commentRes.comments;
    }
}

export const createCommentThunk = (comment, id) => async (dispatch) => {
    const response = await fetch (`/api/posts/${id}/comments/new`, {
        method:'POST',
        body:comment
    });
    if(response.ok) {
        const newComment = await response.json();
        await dispatch(actionCreateComment(newComment));
        return newComment;
    }
    return response.json();
}

export const updateCommentThunk = (comment, commentId) => async (dispatch)=>{
    const response = await fetch(`/api/comments/${commentId}`, {
        method: 'PATCH',
        body: comment
    });
    if(response.ok) {
        const updatedComment = await response.json();
        await dispatch(actionUpdateComment(updatedComment));
        return updatedComment;
    }
    return response.json();
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method:'DELETE'
    });
    if(response.ok) {
        await dispatch(actionRemoveComment(commentId))
        return await response.json()
    }
    return await response.json()
};

const initialState ={
    postComments:{},
}

const commentReducer = (state=initialState, action)=>{
    switch(action.type) {
        case LOAD_COMMENT:
            const allComments={};
            action.comments.forEach((r)=>{
                allComments[r.id] = r;
            })
            return {...state, postComments:{...allComments}};
        case CREATE_COMMENT:
            return {
                ...state,
                postComments:{...state.postComments, [action.comment.id]:action.comment}
            }
        case UPDATE_COMMENT:
            return {
                ...state,
                postComments:{...state.postComments,[action.comment.id]: action.comment}
            }
        case REMOVE_COMMENT:
            const newPostComment = {...state};
            console.log('in delete reducer', newPostComment.postComments[action.id])
            delete newPostComment.postComments[action.id];
            return newPostComment;
        default:
            return state;
    }
}

export default commentReducer;