import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as PostActions from '../../store/post';
import PostIndexItem from "./PostIndexItem";
import './Feed.css'
import OpenModalItem from "../OpenModalItem";
import SignUpLoginModal from "../Signup_LoginModal";
import mushroomKingdom from './assets/mushroomKingdom.png'
function AllPosts () {
    const dispatch = useDispatch();
    const history = useHistory();
    const postsObj = useSelector((state) => state.posts.allPosts);
    const user = useSelector((state)=> state.session.user);

    useEffect(()=>{
        dispatch(PostActions.getAllPosts());

        return ()=>dispatch(PostActions.actionClearPosts())
    }, [dispatch]);

    const plusClicked = e => {
        e.preventDefault();
        history.push('/posts/new')
    }
    const userNoIdplusClicked = e => {
        e.preventDefault();
        window.alert('You must be logged in to create a post.')
    }

    if(!postsObj) return(<div>
        <img src="https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif"/>
    </div>)

    const posts = Object.values(postsObj);

    return (
        <div className="feedPage">
            <div className="feedNav">
                <div className="feedNavLeft"></div>
                <img style={{height:'500px', width:"1200px", objectFit:"cover"}}
                src={mushroomKingdom} alt='background'/>
                {/* <h1>Welcome to our community!</h1> */}
            <div>
                {!user?.id ? 
                <OpenModalItem 
                modalComponent={<SignUpLoginModal/>}
                itemType= 'icon'
                />
                : <i 
                style={{ cursor: "pointer" }}
                className="fa-solid fa-plus fa-lg"
                onClick={plusClicked}
                ></i>}
            </div>
            </div>
            {posts.map((post) => (
                <div key={post.id}>
                    <PostIndexItem post={post} key={post.id} user={user} page="AllPosts" />
                </div>
            ))}
        </div>
    )

}

export default AllPosts