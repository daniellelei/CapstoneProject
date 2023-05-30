import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, NavLink, useParams } from "react-router-dom";
import {useModal} from "../../context/Modal"
import * as postsAction from '../../store/post';
import * as customizationActions from '../../store/customization'
import './EditPost.css'
import SingleCustEdit from "./SingleCustEdit";
const EditPost = ({post, setShowEditPost, showEditPost,}) => {
    const{postId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const [caption, setCaption] = useState(post.caption);
    const [captionLength, setCaptionLength] = useState(caption.length);
    const [errors, setErrors] = useState({});
    const [resErrors, setResErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [custChosen, setCustChosen] = useState([]);
    const oldchosenCust = post?.customizations; //array
    const custsObj = useSelector((state)=>state.customizations.allUserCustomizations)
    const user = useSelector((state) => state.session.user);
    const user_id = user.id;
    
    useEffect(()=>{
        if(post){
            for (let i of oldchosenCust){
            dispatch(postsAction.actionAddChosenCust(i))
        }
    }
    },[])

    useEffect(()=>{
        
        dispatch(customizationActions.getUserCustomizationThunk(user_id))

        return () => {
            dispatch(customizationActions.actionClearSavedCustomizations())
            dispatch(postsAction.actionClearChosenCusts())
        }
    },[dispatch, user])
    
    useEffect(()=>{
        const err = {};
        if(caption?.length<5) err.caption = 'Caption needs to be at least 5 characters long.'
        
        setErrors(err);
    },[caption])

    let custs = []
    let chosenCust = []
    let chosenCustVal = []

    if (!custsObj) {
        custs = [] 
    } else {
        custs = Object.values(custsObj)
    }


    const chosenCustObj = useSelector((state)=>state.posts.chosenCust)
    const maxLengthClassHandler = (count) => {
            if(count === 255) return "showCharacterLength reachedMax"
            return "showCharacterLength";
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!chosenCustObj) {
            chosenCustVal = []
        } else {
            chosenCustVal = Object.values(chosenCustObj)
            console.log('chosenCust1', chosenCustVal)
            for (let c of chosenCustVal) {
            chosenCust.push(c.id)
            console.log('chosenCust  2', chosenCust)
        }
        chosenCust = chosenCust.join(' ')
        }

        console.log('chosenCust  3', chosenCust)
        setHasSubmitted(true);
        setResErrors({});
        
        if(!Boolean(Object.values(errors).length)) {
            const formData = new FormData();
            formData.append('caption', caption);
            // formData.append('image', image);
            formData.append('chosenCust', chosenCust);
            
            const updatedRes = await dispatch(
                postsAction.updatePost(formData, post.id)
            )
            if (!updatedRes.errors) {
                await dispatch(postsAction.getPostDetail(updatedRes.id));
                await setHasSubmitted(false);
                setShowEditPost(false);
            } else {
                await setResErrors(updatedRes.errors);
            }
        }
    }
    if(!post) return (<div className='loadingPage'>
        <img className="loadingImg" src="https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif"/>
    </div>)


    return (
        <div className="editPost">
            <form onSubmit={handleSubmit}
            encType="multipart/form-data"
            >
                <ul>
                    {hasSubmitted && Boolean(Object.values(resErrors).length) ? (
                        <li>{Object.values(resErrors)}</li>
                    ) : null}
                </ul>
                <div>
                    <div className="editPostInput">
                        <label>Edit Caption: </label>
                        <input
                            maxLength={255}
                            style={{width:"100%"}}
                            type = 'text'
                            placeholder="Any thoughts???"
                            value={caption}
                            name = {caption}
                            onChange = {(e)=>{
                                setCaption(e.target.value);
                                setCaptionLength(e.target.value.length);
                            }}
                        >
                        </input>
                        <p className={maxLengthClassHandler(captionLength)}
                    >{captionLength} /255 characters</p>
                        {hasSubmitted ? (
                            <p>{errors.caption}</p>
                        ) : null}
                        <div style={{width:"100%",display:"flex", justifyContent:"flex-end"}}>
                            <button type="submit">
                            Update
                            </button>
                            <button onClick={(e)=>{
                                e.preventDefault();
                                setShowEditPost(false);
                            }}
                            >Cancel</button>
                        </div>
                        </div>
                    <div>
                        {custs.length !== 0 ? 
                            <div className="editPostBottom">
                                <h1>My Favorites</h1>
                                <h4>Choose any that you would like to share</h4>
                                <div className="listCusts">
                                   {
                                        custs.map((cust)=>(
                                            <div key={cust.id}>
                                                <SingleCustEdit
                                                cust={cust} 
                                                user={user} 
                                                oldchosenCust={oldchosenCust}
                                                />
                                            </div>
                                    ))} 
                                </div>
                            </div> : null} 
                        </div>
                    
                </div>

            </form>
        </div>
    )

}

export default EditPost;