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
                    />
                    <div className="postDetail">
                        <p className="postCaption">{post.caption}</p>
                        <p className="postDate">{post.postDate}</p>
                        <p className="postDate">Posted by {post.user?.username}</p>
                        {/* <p>1.2k likes</p>
                        <i className="fa-solid fa-thumbs-up"></i> */}
                    </div>
                </div>
            </Link>
        </div>
    )

}

export default PostIndexItem;