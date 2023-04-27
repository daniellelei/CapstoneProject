import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import * as postsAction from "../../store/post";
import * as cartActions from "../../store/cart";
import * as customizationActions from '../../store/customization'
import "./CreatePost.css";
import { useModal } from "../../context/Modal";



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
    const [custChosen, setCustChosen] = useState([]);

    useEffect(()=>{
        dispatch(customizationActions.getUserCustomizationThunk(user_id))

        return () => dispatch(customizationActions.actionClearSavedCustomizations())
    },[dispatch])

    let custs = []

    if (!custsObj) {
        custs = [] 
    } else {
        custs = Object.values(custsObj)
    }
    // console.log('custsObj', custsObj)
    // console.log('custs', custs)



    useEffect(()=>{
        const err = {};
        if(caption.length<5) err.caption = 'Caption needs to be at least 5 characters long.'
        if(!image.length) err.image = 'Image is required'
        // if(!image.includes('.jpg')||!image.includes('.png')) err.image = 'Image is not valid'

        setErrors(err);
    },[caption, image])

    const handleSubmit = async (e) => {
        console.log('i am here', Object.values(errors))
        e.preventDefault();
        setHasSubmitted(true);
        setResErrors({});
        console.log("custChose", custChosen)

        if(!Boolean(Object.values(errors).length)) {
            console.log('i am here')
            const createdRes = await dispatch(
                postsAction.createPost({
                    caption,
                    image,
                    custChosen,
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
    

    return (
        <div>
            <h1>Create a Post</h1>
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
                                    custs.map((c)=>(
                                    <div key={c.id} className="eaCust">
                                        <NavLink className="eaCust" key={c.id} to={`/customizations/${c.id}`}>
                                            <p>{c.Drink.name}</p>
                                            <img className="drinkImg" src = {c.Drink.imageUrl}/>
                                            <div>
                                                <p>Size: {c.size}</p>
                                                <p>Milk Option:{c.milk}</p>
                                                <p>Shot Options: {c.shotOptions}</p>
                                                <p>Expresso Roast: {c.expressoRoastOptions}</p>
                                                <p>${c.Drink.price}</p>
                                            </div>
                                        </NavLink>
                                        <div className="allCustBottom">
                                            <button
                                            onClick ={ async (e) => {
                                                e.preventDefault();
                                                custChosen.push(c)
                                                setCustChosen(custChosen)
                                            }}
                                            >Choose</button>
                                        </div>
                                    </div>))} 
                            </div> : null}
                        </div>
                    <button type="submit">
                        Post
                    </button>
                </div>

            </form>
        </div>
    )

}

export default CreatePost;
