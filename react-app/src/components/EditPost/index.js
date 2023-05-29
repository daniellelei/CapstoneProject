import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, NavLink, useParams } from "react-router-dom";
import {useModal} from "../../context/Modal"
import * as postsAction from '../../store/post';
import * as customizationActions from '../../store/customization'
import './EditPost.css'
import SingleCustEdit from "./SingleCustEdit";
const EditPost = () => {
    const{postId} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    // const postId = post.id
    const post = useSelector((state)=> state.posts.singlePost)

    const [loading, setLoading] = useState(true);
    const [caption, setCaption] = useState(post.caption);
    const [image, setImage] = useState(post.image);
    const [errors, setErrors] = useState({});
    const [resErrors, setResErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [custChosen, setCustChosen] = useState([]);
    const [imageLoading, setImageLoading] = useState(false);
    const [preview, setPreview] = useState({});

    const custsObj = useSelector((state)=>state.customizations.allUserCustomizations)
    const user = useSelector((state) => state.session.user);
    const user_id = user.id;
    const oldchosenCust = post.customizations; //array
    useEffect(()=>{
        for (let i of oldchosenCust){
        dispatch(postsAction.actionAddChosenCust(i))
    }
    },[])
    useEffect(()=>{
        if(loading) {
            setTimeout(()=>{
                setLoading(false)
            }, 1800);
        }
        dispatch(postsAction.getPostDetail(postId))

        return () => dispatch(postsAction.actionClearPost())
    },[dispatch, loading, user])
    

    useEffect(()=>{
    dispatch(customizationActions.getUserCustomizationThunk(user_id))

    return () => {
        dispatch(customizationActions.actionClearSavedCustomizations())
        dispatch(postsAction.actionClearChosenCusts())
    }

    },[dispatch])

    let custs = []
    let chosenCust = []
    let chosenCustVal = []
    if (!custsObj) {
        custs = [] 
    } else {
        custs = Object.values(custsObj)
    }
    

    useEffect(()=>{
        const err = {};
        if(caption.length<5) err.caption = 'Caption needs to be at least 5 characters long.'
        
        setErrors(err);
    },[caption, image])

    const chosenCustObj = useSelector((state)=>state.posts.chosenCust)
    const handleSubmit = async (e) => {
        // console.log('i am here', Object.values(errors))
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
        
        console.log('image', image)
        if(!Boolean(Object.values(errors).length)) {
            const formData = new FormData();
            formData.append('caption', caption);
            formData.append('image', image);
            formData.append('chosenCust', chosenCust);
            
            const updatedRes = await dispatch(
                postsAction.updatePost(formData, post.id)
            )
            if (!updatedRes.errors) {
                await dispatch(postsAction.getPostDetail(updatedRes.id));
                await setHasSubmitted(false);
            } else {
                await setResErrors(updatedRes.errors);
            }
        }
    }

    return (
        <div className="editModal">
            <h1>Edit a Post</h1>
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
                        <label>Caption: </label>
                        <input
                            type = 'text'
                            placeholder="Any thoughts???"
                            value={caption}
                            name = {caption}
                            onChange = {(e)=>setCaption(e.target.value)}
                        >
                        </input>
                        {hasSubmitted ? (
                            <p>{errors.caption}</p>
                        ) : null}
                    </div>
                    <div className="caption">
                        <label>Upload an image: </label>
                        <input
                            type = 'file'
                            accept="image/*" 
                            name = {image}
                            onChange = {(e)=>setImage(e.target.files[0])}
                            >
                        </input>
                        {hasSubmitted ? (
                            <p className="errors">{errors.image}</p>
                            ) : null}
                    </div>

                    <div>
                        {custs.length !== 0 ? 
                            <div className="editPostBottom">
                                <h1>My Favorites</h1>
                                <h4>Choose any that you would like to share</h4>
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
                            </div> : null} 
                        </div>
                    <button type="submit">
                       Update
                    </button>
                </div>

            </form>
        </div>
    )

}

export default EditPost;