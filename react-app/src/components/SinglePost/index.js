import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useLocation, useParams, useHistory } from "react-router-dom";
import * as customizationActions from '../../store/customization';
import * as cartActions from '../../store/cart';
import * as postActions from '../../store/post';
import OpenModalButton from '../OpenModalButton';
import SignUpLoginModal from '../Signup_LoginModal';
import DeletePostModal from '../DeletePost';
import EditPost from '../EditPost';
import { useModal } from '../../context/Modal';
import ConfirmModal from '../SingleDrink/confirmModal';
import Comments from './Comments'

import { isAdded, numOfAdded } from "../SingleDrink";
import './SinglePost.css'
const SinglePost = () => {
    const {postId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const currentCart = useSelector((state) => state.carts.currentCart);
    const user = useSelector((state)=> state.session.user);
    const post = useSelector((state)=> state.posts.singlePost)
    const customizations = post.customizations; //array of customizations
    const author_id = post.author_id
    const { setModalContent, setOnModalClose } = useModal();
    const [showEditPost, setShowEditPost] = useState(false)

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

    const clickEdit = (e) => {
        e.preventDefault();
        setShowEditPost(true);
    }

    if (!post?.id || loading) return (<div className='loadingPage'>
        <img className="loadingImg" src="https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif"/>
    </div>)
    

    return (
        <div className='singlePostPage'>
            <i className="fa-solid fa-arrow-left fa-xl"
            style={{color:'black', width:'90%', cursor:"pointer"}}
            onClick={(e)=>{
                e.preventDefault();
                history.push("/posts")
            }}
            ></i>
            <img 
                className="postImg"
                src = {post.image}
                alt = {`post_image_url`}
            />
            <div 
            style={{display:'flex', 
            alignItems:"center",
            width:"20%",
            
            }}
            >
            <img 
            style={{height:"40px",width:"40px",borderRadius:"50%", marginRight:"1em"}}
            src={post.user.profilePic} alt="user_image"/>
            <h4>{post.user.username}</h4>
            </div>
            
                {!showEditPost ? (<div className="postDetail">
                    <p className="postCaption">{post.caption}</p>
                    <p className="postDate">{new Date(post.postDate).toDateString()}</p>
                    {user?.id === author_id 
                ? (
                    <div 
                    style={{translate:"transform-Y(-20px)", display:"flex", flexDirection:"row", width: '380px', justifyContent:"flex-end", marginBottom:"10px"}}
                    >
                        <button 
                        className='navButton'
                        onClick = {clickEdit}
                        >
                        <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button 
                        className='navButton'
                        onClick = {async (e) => {
                            e.preventDefault();
                            setModalContent(<DeletePostModal post={post} />);
                            }}
                        >
                        <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                ) 
                : null}
                {!customizations.length? null :(
                    <h3>This is what I would like to share with you. Hope you'd like it 😋</h3>
                )}
                <div className='postCusts'>
                {customizations.map((customization) => (
                    <div className='eaPostCust'>
                        <img 
                        className='drinkImg'
                        src = {customization.drinks_customization.imageUrl}
                        alt="profile_img"
                        />
                        <div className='eaPostCustDetail'>
                            <p className="postDate">Size: {customization.size}</p>
                            <p className="postDate">Milk options: {customization.milk}</p>
                            <p className="postDate">Shot Options: {customization.shotOptions}</p>
                            <p className="postDate">Expresso Roast: {customization.expressoRoastOptions}</p>
                            <p className='postDate'>Tea Base: {customization.teaBase}</p>
                            <p className='postDate'>Additionals:</p>
                            <p className="cartP">{customization.toppings}</p>
                            <p className="cartP">{customization.flavors}</p>
                            <p className="cartP">{customization.addIns}</p>
                            <p className="cartP">{customization.sweeteners}</p>
                            
                        </div>
                        {user && !isAdded(currentCart,'customization', customization.id) ? <button
                        onClick = {async (e) => {
                            e.preventDefault();
                            if(user){
                                await dispatch(cartActions.addToCartThunk(customization))
                            }
                            setModalContent(<ConfirmModal />);
                            }}
                        >Add</button>
                        : null} 
                        {!user ? <OpenModalButton 
                            buttonText= "Add to Cart"
                            modalComponent={<SignUpLoginModal page={`/customizations/${customization.id}`}/>}
                        /> : null}
                        <div className='plusMinus'>
                            {user && isAdded(currentCart,'customization', customization.id)? 
                            <i 
                            className="fa-solid fa-square-minus"
                            onClick = { (e) => {
                                e.preventDefault();
                                console.log('hit me minus customization.id ',customization.id)
                                dispatch(cartActions.removeFromCartThunk(customization))
                                console.log('after hitting thunkkk', customization.id)
                            }}
                            ></i>
                            : null}
                            {isAdded(currentCart, 'customization', customization.id)? <span className='numOfdrink'>{numOfAdded(currentCart, 'customization', customization.id)}</span> : null}
                            { user && isAdded(currentCart, 'customization', customization.id)? 
                            <i 
                            className="fa-solid fa-square-plus"
                            onClick = { async(e) => {
                                e.preventDefault();
                                if(user){
                                    await dispatch(cartActions.addToCartThunk(customization))
                                }
                            }}
                            ></i>
                            : null}
                                    </div>
                                </div>
                            ))}
                        </div>


                </div>):(
                    <div>
                        <EditPost post={post} setShowEditPost={setShowEditPost} showEditPost={showEditPost} />
                    </div>
                )}
                
                {/* <p>1.2k likes</p> */}
                {/* <i className="fa-solid fa-thumbs-up"></i> */}
            
            

            
            
            <Comments post={post}/>
            
        </div>
    )

}

export default SinglePost;

