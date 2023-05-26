import { useEffect, useState , useRef, useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";
// import {StyledDropZone} from 'react-drop-zone';
import {useDropzone} from 'react-dropzone';
import { useHistory, NavLink } from "react-router-dom";
import * as postsAction from "../../store/post";
import * as cartActions from "../../store/cart";
import * as customizationActions from '../../store/customization'
import "./CreatePost.css";
import { useModal } from "../../context/Modal";
import SingleCust from "./SingleCust";
import Dropzone from "react-dropzone";
import 'react-drop-zone/dist/styles.css'
// import Dropzone from "./Dropzone";
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
    const [imageLoading, setImageLoading] = useState(false);
    const [preview, setPreview] = useState({});
    const [url, setUrl] = useState("");

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
    let chosenCust = []
    let chosenCustVal = []

    if (!custsObj) {
        custs = [] 
    } else {
        custs = Object.values(custsObj)
    }
    if(!chosenCustObj) {
        chosenCustVal = []
    } else {
        chosenCustVal = Object.values(chosenCustObj)
        
        for (let c of chosenCustVal) {
            chosenCust.push(c.id)
        }
        chosenCust = chosenCust.join(' ')
    }


    useEffect(()=>{
        const err = {};
        if(caption.length<5) err.caption = '* Caption needs to be at least 5 characters long.'
        if(!image) err.image = '* Image is required'
        

        setErrors(err);
    },[caption, image])

    // console.log('image loading', imageLoading)

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('i am here', Object.values(errors))
        setHasSubmitted(true);
        setResErrors({});
        

        if(!Boolean(Object.values(errors).length)) {
            const formData = new FormData();
            formData.append('caption', caption);
            formData.append('image', image);
            formData.append('chosenCust', chosenCust);
            // postsAction.createPost({
            //     caption,
            //     image,
            //     chosenCust,
            // })
            setImageLoading(true);
            const createdRes = await dispatch(postsAction.createPost(formData))
            if (!createdRes.errors) {
                console.log('this is create', createdRes.id)
                await dispatch(postsAction.getPostDetail(createdRes.id));
                history.push(`/posts/${createdRes.id}`);
                setImageLoading(false)
                await reset();
            } else {
                setImageLoading(false)
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
    const handleOnDrop =(files) => {
        setImage(files[0]);
        let pre = {};
        pre.preview = URL.createObjectURL(files[0]);
        setPreview(pre);
    }
    const removeHandler = (e) => {
        e.preventDefault();
        setImage([]);
        setPreview({});
    };
    const thumb = (files) => {
        return (
        <div>
            {preview?.preview ? (
            <img
                className="previewImage"
                src={preview.preview}
                alt="preview"
                onLoad={() => {
                URL.revokeObjectURL(preview.preview);
                }}
            />
            ) : null}
            {preview?.preview ? (
            <div className="trashDiv">
                <button
                onClick={removeHandler}
                className="trashbutton left"
                data-text="Delete image"
                >
                <i className="fa-solid fa-trash-can fa-xl"></i>
                </button>
            </div>
            ) : null}
        </div>
        );
    };




    console.log('image', image)
    return (
        <div className="create_post_page">
            <h1>Create a Post</h1>
            <form onSubmit={handleSubmit} 
            // onDragEnter = {handleDrag}
            encType="multipart/form-data"
            className="createPostForm">
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
                            className="cap1"
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
                    <div>
                        <Dropzone
                        onDrop={handleOnDrop}
                        multiple={false}
                        className="dropzone"
                        accept={"image/*"} >
                        {({
                            getRootProps,
                            getInputProps,
                            isDragActive,
                            acceptedFiles,
                        }) => (
                                <section>
                                    <div
                                    {...getRootProps({ className: "dropzone" })}
                                    className="image_drop_zone"
                                    >
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <div className="dragActive">
                                        <p className="postDate">
                                            Release to drop the files here
                                        </p>
                                        <p className="recommend">
                                            Recommendation: Use high-quality .jpg/.png files less than
                                            20MB
                                        </p>
                                        </div>
                                    ) : (
                                        <div className="dragNotActive">
                                        <i
                                            className="fa-solid fa-arrow-up-from-bracket fa-xl"
                                            style={{ color: "#818488;" }}
                                        ></i>
                                        <p className="postDate">
                                            Drag and drop or click to upload
                                        </p>
                                        <p className="recommend">
                                            Recommendation: Use high-quality .jpg/.png <br />
                                            files less than 20MB
                                        </p>
                                        </div>
                                    )}
                                    </div>
                                    <aside className="preview"> {thumb(acceptedFiles)} </aside>
                                </section>
                                )}
                        </Dropzone>
                        {hasSubmitted ? (
                            <p className="error">{errors.image}</p>
                        ): (
                            <p className="noErrorDisplay">{'   '}</p>
                        )}
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
                                            <div key={cust.id}>
                                                <SingleCust 
                                                cust={cust} 
                                                user={user} 
                                                setCustChosen={setCustChosen} 
                                                custChosen={custChosen}/> 
                                            </div>
                                        
                            ))} </div>
                            </div>   : null }
                    
                    {imageLoading && <div className='loadingPage'>
                    <img className="loadingImg" 
                    src="https://cdn.dribbble.com/users/2520294/screenshots/7209485/media/cf226d98a06282e9cabf5c2f8f6d547f.gif"/>
                    </div>
                    }
            </form>
        </div>
    )

}

export default CreatePost;




{/* <div className="caption">
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
                    </div> */}