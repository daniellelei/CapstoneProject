import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, NavLink } from "react-router-dom";
import {useModal} from "../../context/Modal"
import * as postsAction from '../../store/post';
import * as customizationActions from '../../store/customization'
import './EditPost.css'
import SingleCustEdit from "./SingleCustEdit";
const EditPost = ({post}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const postId = post.id


    const [caption, setCaption] = useState(post.caption);
    const [image, setImage] = useState(post.image);
    const [errors, setErrors] = useState({});
    const [resErrors, setResErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [custChosen, setCustChosen] = useState([]);

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
        dispatch(customizationActions.getUserCustomizationThunk(user_id))

        return () => {
            dispatch(customizationActions.actionClearSavedCustomizations())
            dispatch(postsAction.actionClearChosenCusts())
        }

    },[dispatch])

    let custs = []

    if (!custsObj) {
        custs = [] 
    } else {
        custs = Object.values(custsObj)
    }
    

    useEffect(()=>{
        const err = {};
        if(caption.length<5) err.caption = 'Caption needs to be at least 5 characters long.'
        if(!image.length) err.image = 'Image is required'
        // if(!image.includes('.jpg')||!image.includes('.png')) err.image = 'Image is not valid'

        setErrors(err);
    },[caption, image])

    const chosenCustObj = useSelector((state)=>state.posts.chosenCust)
    const handleSubmit = async (e) => {
        // console.log('i am here', Object.values(errors))
        e.preventDefault();

        let chosenCust = []
        if(!chosenCustObj) {
            chosenCust = []
        } else {
            chosenCust = Object.values(chosenCustObj)
        }
        setHasSubmitted(true);
        setResErrors({});
        console.log("custChose========in onClick", chosenCust)

        if(!Boolean(Object.values(errors).length)) {
            console.log('i am here')
            const updatedRes = await dispatch(
                postsAction.updatePost({
                    postId,
                    caption,
                    image,
                    chosenCust,
                })
            )
            if (!updatedRes.errors) {
                // console.log('this is update', updatedRes.id)
                await dispatch(postsAction.getPostDetail(updatedRes.id));
                closeModal()
                await setHasSubmitted(false);
                
            } else {
                await setResErrors(updatedRes.errors);
            }
        }
    }

    return (
        <div className="editModal">
            <h1>Edit a Post</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {hasSubmitted && Boolean(Object.values(resErrors).length) ? (
                        <li>{Object.values(resErrors)}</li>
                    ) : null}
                </ul>
                <div>
                    <div>
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
                    <div>
                        <label>Upload an image: </label>
                        <input
                            type = 'text'
                            placeholder="image url is required"
                            value={image}
                            name = {image}
                            onChange = {(e)=>setImage(e.target.value)}
                        >
                        </input>
                        {hasSubmitted ? (
                            <p>{errors.image}</p>
                        ) : null}
                    </div>
                    <div>
                        {custs.length !== 0 ? 
                            <div>
                                <h1>My Favorites</h1>
                                <h4>Choose any that you would like to share</h4>
                                {
                                    custs.map((cust)=>(
                                        <SingleCustEdit
                                        key={cust.id}
                                        cust={cust} 
                                        user={user} 
                                        oldchosenCust={oldchosenCust}
                                        />
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