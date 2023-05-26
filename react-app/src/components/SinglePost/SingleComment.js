import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as commentActions from '../../store/comment';
import EditComment from './EditComment';

const SingleComment = ({comment})=>{
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.session.user)
    const [showEdit, setShowEdit] = useState(false)


    const clickEdit = (e) => {
        e.preventDefault();
        setShowEdit(true);
    }
    const clickDelete = (e)=> {
        e.preventDefault();
        
    }

    return (
        <div className='eaComment' key={comment.id}>
            <div style={{display:"flex", justifyContent:'center', alignItems:"center", marginLeft:'3%'}}>
                <img 
                    style={{height:"40px",width:"40px",borderRadius:"50%"}}
                    src={comment.user.profilePic} alt="user_profile_pic"/>
                <div className='userInfo'>
                    <div className='comment_name_date'>
                        <p style={{fontWeight:"bolder"}}>{comment.user.username}</p>
                        <p 
                        style={{fontSize:"12px",marginLeft:'10px',color:"grey"}}>
                            {new Date(comment.dateTime).toDateString()}</p>
                    </div>
                </div>
            </div>
            <div
            style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'90%', margin:'3%'}}
            >
                {showEdit && comment.user.id === user.id? (
                    <div>
                        <EditComment comment={comment} setShowEdit={setShowEdit} showEdit={showEdit}/>
                    </div>
                    ) : (<div><p className='userInfoP'>{comment.commentBody}</p></div>)}
                {comment.user.id === user.id && !showEdit ? (
                    <div>
                        <i onClick={clickEdit} className="fa-solid fa-pen-to-square" 
                        style={{color:"black", cursor:'pointer', marginRight:"5px"}}></i>
                        <i onClick={clickDelete} className="fa-solid fa-trash"
                        style={{color:"black", cursor:'pointer'}}
                        ></i>
                    </div>
                ) : null}
            </div>
            {/* {showEdit && comment.user.id === user.id? (
                <div>
                    <EditComment comment={comment} setShowEdit={setShowEdit}/>
                </div>
            ) : (<div>{'   '}</div>)} */}
        </div>
    )
}

export default SingleComment;