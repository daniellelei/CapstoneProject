const LOAD_POSTS = "posts/load_all";
const LOAD_POST_DETAIL = "posts/load_one";
const LOAD_USER_POSTS = "posts/load_user_posts";

const CREATE_POST = "posts/create";
const UPDATE_POST = "posts/update";
const REMOVE_POST = "posts/delete";

const CLEAR_POST_DETAIL = "posts/clear_post_state";
const CLEAR_POSTS = "posts/clear_posts_state";

export const actionLoadAllPosts = (posts) => ({
  type: LOAD_POSTS,
  posts,
});

export const actionLoadPostDetail = (post) => ({
  type: LOAD_POST_DETAIL,
  post,
});
export const actionLoadUserPosts = (posts) => ({
  type: LOAD_USER_POSTS,
  posts,
});

export const actionCreatePost = (post) => ({
  type: CREATE_POST,
  post,
});
export const actionUpdatePost = (post) => ({
  type: UPDATE_POST,
  post,
});
export const actionRemovePost = (id) => ({
  type: REMOVE_POST,
  id,
});
export const actionClearPosts = () => ({
  type: CLEAR_POSTS,
});
export const actionClearPost = () => ({
  type: CLEAR_POST_DETAIL,
});

export const getAllPosts = () => async (dispatch) => {
  const response = await fetch("/api/posts");
  if (response.ok) {
    const posts = await response.json();
    await dispatch(actionLoadAllPosts(posts));
    return posts;
  }
  return response;
};

export const getPostDetail = (id) => async (dispatch) => {
  const response = await fetch(`/api/posts/${id}`);

  if (response.ok) {
    const post = await response.json();
    await dispatch(actionLoadPostDetail(post));
    return post;
  }
};

export const createPost = (post) => async (dispatch) => {
  console.log('post in thunk', post)
  const response = await fetch("/api/posts/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });

  if (response.ok) {
    const newPost = await response.json();
    console.log('new Post from thunk', newPost)
    // const post = newPost.post;
    await dispatch(actionCreatePost(newPost));
    return newPost;
  }
  return response.json();
};

export const updatePost = (post, postId) => async (dispatch) => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PATCH",
    body: post,
  });

  if (response.ok) {
    const updatedPost = await response.json();
    const updated_post = updatedPost.post;
    await dispatch(actionUpdatePost(updated_post));
    return updated_post;
  }
  return response.json();
};

export const deletePost = (post) => async (dispatch) => {
  const response = await fetch(`/api/posts/${post.id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    await dispatch(actionRemovePost(post.id));
    return await response.json();
  }
  return await response.json();
};

const initialState = {
  allPosts: {},
  singlePost: {},
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_POSTS:
      const allPosts = {};
      action.posts.forEach((post) => {
        allPosts[post.id] = post;
      });
      return { ...state, allPosts: { ...allPosts } };
    case LOAD_POST_DETAIL:
      return { ...state, singlePost: { ...action.post } };
    case LOAD_USER_POSTS:
      const allUserPosts = {};
      action.posts.forEach((post) => {
        allUserPosts[post.id] = post;
      });
      return { ...state, allPosts: { ...allUserPosts } };
    case CREATE_POST:
      return {
        ...state,
        allPosts: { ...state.allPosts, [action.post.id]: action.post },
        singlePost: {...action.post},
      };
    case UPDATE_POST:
      return {
        ...state,
        allPosts: { ...state.allPosts, [action.post.id]: action.post },
        singlePost: {...action.post},
      };
    case REMOVE_POST:
      const newState = { ...state };
      delete newState.allPosts[action.id];
      return newState;
    case CLEAR_POSTS:
      return { ...state, allPosts: {} };
    case CLEAR_POST_DETAIL:
      return { ...state, singlePost: {} };
    default:
      return state;
  }
};

export default postReducer;
