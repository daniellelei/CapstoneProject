import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useLocation, useParams, useHistory } from "react-router-dom";
import * as customizationActions from '../../store/customization';
import * as cartActions from '../../store/cart';
import * as postActions from '../../store/post';
import OpenModalButton from '../OpenModalButton';
import DeletePostModal from '../DeletePost';
import EditPost from '../EditPost';
import './SinglePost.css'
const SinglePost = () => {
    const {postId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const cart = useSelector((state) => state.carts.currentCart);
    const user = useSelector((state)=> state.session.user);
    const post = useSelector((state)=> state.posts.singlePost)
    console.log('this is Post', post)
    const customizations = post.customizations; //array of customizations
    const author_id = post.author_id

    useEffect(()=>{
        if(loading) {
            setTimeout(()=>{
                setLoading(false)
            }, 1800);
        }
        dispatch(postActions.getPostDetail(postId))
        // dispatch(customizationActions.getCustomizationDetailThunk(customizationId))
        if(user){
            dispatch(cartActions.getCurrentCartThunk());
        }

        return () => dispatch(postActions.actionClearPost())
    },[dispatch, loading, user])

    if (!post?.id || loading) return (<div className='loadingPage'>
        <img className="loadingImg" src="https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif"/>
    </div>)

    console.log('this is single Post', post)

    return (
        <div className='singlePostPage'>
            <img 
                className="postImg"
                src = {post.image}
                alt = {`post image url`}
            />
            <div className="postDetail">
                <p className="postCaption">{post.caption}</p>
                <p className="postDate">{post.postDate}</p>
                <p className="postDate">Posted by {post.user.username}</p>
                <p>1.2k likes</p>
                <i className="fa-solid fa-thumbs-up"></i>
            </div>
            {user?.id === author_id 
            ? (
                <div>
                    <OpenModalButton
                buttonText='Edit'
                modalComponent={<EditPost post={post}/>} />
                    <OpenModalButton
                    buttonText='Delete'
                    modalComponent={<DeletePostModal post={post}/>} />
                </div>
            ) 
            : null}

            {!customizations.length ? null :(
                <h3>This is what I would like to share with you. Hope you'd like it 😋</h3>
            )}
            <div className='postCusts'>
                {customizations.map((customization) => (
                    <div className='eaPostCust'>
                        <img 
                        className='drinkImg'
                        src = {customization.drinks_customization.imageUrl}
                        />
                        <div>
                            <p className="postDate">Size: {customization.size}</p>
                            <p className="postDate">Milk options: {customization.milk}</p>
                            <p className="postDate">Shot Options: {customization.shotOptions}</p>
                            <p className="postDate">Expresso Roast: {customization.expressoRoastOptions}</p>
                        </div>
                        <button
                        onClick ={ async (e) => {
                            e.preventDefault();
                            await dispatch(cartActions.addToCartThunk(customization));
                        }}
                        >Add to Cart</button>
                    </div>
                ))}
            </div>

            
            

        </div>
    )

}

export default SinglePost;