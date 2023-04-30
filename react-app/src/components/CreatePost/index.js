import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import * as postsAction from "../../store/post";
import * as cartActions from "../../store/cart";
import * as customizationActions from '../../store/customization'
import "./CreatePost.css";
import { useModal } from "../../context/Modal";
import SingleCust from "./SingleCust";

export const chosen = (customization, custs) => {
    let chosenOrNot = false;
    const custsIdArr = []
    if (custs?.length > 0) {
        for ( let i in custs) {
            custsIdArr.push(i.id)
        }
        if(custsIdArr.includes(customization.id)) chosenOrNot = true;
    }
    return chosenOrNot;
}

const CreatePost = () => {

    const [caption, setCaption] = useState('');
    const [image, setImage] = useState('');
    const [errors, setErrors] = useState({});
    const [resErrors, setResErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);
    const user_id = user.id;

    const custsObj = useSelector((state)=>state.customizations.allUserCustomizations)
    const [custChosen, setCustChosen] = useState({}); //an array of id's
    const chosenCustObj = useSelector((state)=>state.posts.chosenCust);

    useEffect(()=>{
        dispatch(customizationActions.getUserCustomizationThunk(user_id))
        
        return () => {
            dispatch(customizationActions.actionClearSavedCustomizations())
            dispatch(postsAction.actionClearChosenCusts())
        }
    },[dispatch, custChosen])

    let custs = []


    if (!custsObj) {
        custs = [] 
    } else {
        custs = Object.values(custsObj)
    }
    let chosenCust = []
    if(!chosenCustObj) {
        chosenCust = []
    } else {
        chosenCust = Object.values(chosenCustObj)
    }


    useEffect(()=>{
        const err = {};
        if(caption.length<5) err.caption = '* Caption needs to be at least 5 characters long.'
        if(!image.length) err.image = '* Image is required'
        if(!image.includes('.jpg') && !image.includes('.png')) err.image = '* Image is not valid'

        setErrors(err);
    },[caption, image])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('i am here', Object.values(errors))
        setHasSubmitted(true);
        setResErrors({});
        // console.log("custChose", custChosen)

        if(!Boolean(Object.values(errors).length)) {
            console.log('i am here')
            const createdRes = await dispatch(
                postsAction.createPost({
                    caption,
                    image,
                    chosenCust,
                })
            )
            if (!createdRes.errors) {
                console.log('this is create', createdRes.id)
                await dispatch(postsAction.getPostDetail(createdRes.id));
                history.push(`/posts/${createdRes.id}`);
                await reset();
            } else {
                await setResErrors(createdRes.errors);
            }
        }
    }
    const reset = () => {
        setCaption('');
        setImage('');
        setCustChosen([]);
        setErrors({});
        setResErrors({});
        setHasSubmitted(false);
    };
    
    // const custOptionClassName = "custOps" + ( custs.includes(c) ? "" : " hidden");
    
    return (
        <div className="create_post_page">
            <h1>Create a Post</h1>
            <form onSubmit={handleSubmit} className="createPostForm">
                <ul>
                    {hasSubmitted && Boolean(Object.values(resErrors).length) ? (
                        <li>{Object.values(resErrors)}</li>
                    ) : null}
                </ul>
                <div className="submitbtn">
                        <button type="submit">
                            Post
                        </button>
                    </div>
                <div className="caption_image">
                    <div className="caption">
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
                            <p className="errors">{errors.caption}</p>
                        ) : null}
                    </div>
                    <div className="caption">
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
                            <p className="errors">{errors.image}</p>
                            ) : null}
                    </div>
                </div>
                    
                        {custs?.length !== 0 ? 
                            <div className="createFormBottom">
                                <div className="title_my_favorite">
                                    <h3>My Favorites</h3>
                                    <h4>Choose any that you would like to share</h4>
                                </div>
                                <div className="createPostCusts">
                                    {
                                        custs.map((cust)=>(
                                        <SingleCust 
                                        key={cust.id}
                                        cust={cust} 
                                        user={user} 
                                        setCustChosen={setCustChosen} 
                                        custChosen={custChosen} 
                                        />
                            ))} </div>
                            </div>   : null }
                    
                    
            </form>
        </div>
    )

}

export default CreatePost;




