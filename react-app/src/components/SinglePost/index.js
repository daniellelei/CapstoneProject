import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useLocation, useParams } from "react-router-dom";
import * as customizationActions from '../../store/customization';
import * as cartActions from '../../store/cart';
import * as postActions from '../../store/post';

const SinglePost = () => {
    const {postId} = useParams();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const cart = useSelector((state) => state.carts.currentCart);
    const user = useSelector((state)=> state.session.user);
    const post = useSelector((state)=> state.posts.singlePost)
    const customizations = post.customizations; //array of customizations

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

    return (
        <div>
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
            <div>
                {customizations.map((customization) => (
                    <div>
                        <p>Size: {customization.size}</p>
                        <p>Milk options: {customization.milk}</p>
                        <p>Shot Options: {customization.shotOptions}</p>
                        <p>Expresso Roast: {customization.expressoRoastOptions}</p>
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