import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import * as postActions from "../../store/post";

import './Feed.css'

const PostIndexItem = ({
    post,
    user,
    page,
}) => {
    return (
        <div key={post.id} className="eaPost">
            <Link to={`/posts/${post.id}`}>
                <div>
                    <img 
                        className="postImg"
                        src = {post.image}
                        alt ="postImg"
                    />
                    <div className="postDetail">
                        <p className="postCaption">{post.caption}</p>
                        <p className="postDate">{new Date(post.postDate).toDateString()}</p>
                        <div 
                        style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}
                        >
                            <img 
                            style={{height:"40px",width:"40px",borderRadius:"50%", marginRight:"10px"}}
                            src={post.user.profilePic} 
                            alt="profileimg"/>
                            <p className="postDate">{post.user?.username}</p>
                        </div>
                        {/* <p>1.2k likes</p>
                        <i className="fa-solid fa-thumbs-up"></i> */}
                    </div>
                </div>
            </Link>
        </div>
    )

}

export default PostIndexItem;