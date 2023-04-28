import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import * as postsAction from "../../store/post";
import * as cartActions from "../../store/cart";
import * as customizationActions from '../../store/customization'
import "./CreatePost.css";
import { useModal } from "../../context/Modal";

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
    const [custChosen, setCustChosen] = useState([]); //an array of id's
    const [chosen, setChosen] = useState(false);
    useEffect(()=>{
        dispatch(customizationActions.getUserCustomizationThunk(user_id))
        
        return () => dispatch(customizationActions.actionClearSavedCustomizations())
    },[dispatch, custChosen])

    let custs = []
    let custsArr = []

    if (!custsObj) {
        custs = [] 
    } else {
        custs = Object.values(custsObj)
    }
    console.log('custsArr', custsArr)
    // console.log('custs', custs)

    useEffect(()=>{
        const err = {};
        if(caption.length<5) err.caption = 'Caption needs to be at least 5 characters long.'
        if(!image.length) err.image = 'Image is required'
        // if(!image.includes('.jpg')||!image.includes('.png')) err.image = 'Image is not valid'

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

    const checkChosen = (custChosen, c) => {
        let res = false
        custChosen?.forEach((f) => {
            console.log('f.id', f.id)
            console.log('c.id', c.id)
            if (f.id === c.id) res = true
        })
        return res;
    }

    const getIndex = ( custChosen, c) => {
        
        let ind = -1;
        if(custChosen !== undefined || custChosen?.length>0){
            for (let i = 0; i < custChosen.length; i++) {
                console.log(`custChosen ${i} id`, custChosen[i].id)
                console.log ('c.id', c.id)
                if (custChosen[i].id === c.id) {
                    ind = i;
                    break;
                }
            }
        }
        return ind;
    }
    

    // const custOptionClassName = "custOps" + ( custs.includes(c) ? "" : " hidden");
    console.log('custChosen', custChosen)
    return (
        <div className="create_post_page">
            <h1>Create a Post</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    {hasSubmitted && Boolean(Object.values(resErrors).length) ? (
                        <li>{Object.values(resErrors)}</li>
                    ) : null}
                </ul>
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
                </div>
                    <div>
                        {custs?.length !== 0 ? 
                            <div>
                                <div className="title_my_favorite">
                                    <h3>My Favorites</h3>
                                    <h4>Choose any that you would like to share</h4>
                                </div>
                                {
                                    custs.map((c)=>(
                                    <div key={c.id}>
            
                                        <div 
                                        // className={checkChosen(custChosen,c) ? ' highlight' : ''}
                                        >
                                            
                                            <p>{c.Drink.name}</p>
                                            <img className="drinkImg" src = {c.Drink.imageUrl}/>
                                            <div>
                                                <p>Size: {c.size}</p>
                                                <p>Milk Option:{c.milk}</p>
                                                <p>Shot Options: {c.shotOptions}</p>
                                                <p>Expresso Roast: {c.expressoRoastOptions}</p>
                                                <p>${c.Drink.price}</p>
                                            </div>
                                        </div>
                                        <div className="allCustBottom">
                                            <p>{console.log(checkChosen(custChosen,c))}</p>
                                            { checkChosen(custChosen, c) ? 
                                            <button
                                            onClick = {(e) => {
                                                e.preventDefault();
                                                
                                                // let i = custChosen.indexOf(c)
                                                console.log('i', getIndex(custChosen, c))
                                                custChosen.splice(getIndex(custChosen, c), 1)
                                                setCustChosen(custChosen)
                                            }
                                            }
                                            >remove</button> 
                                            : <button
                                            onClick = { (e) => {
                                                custChosen.push(c)
                                                setCustChosen(custChosen)
                                            }}
                                            >choose</button>
                                            }
                                            {/* <button
                                            // className={shown(chosen)}
                                            onClick ={ async (e) => {
                                                e.preventDefault();
                                                const custsIdArr = []
                                                if (custChosen?.length > 0) {
                                                    for ( let a of custChosen) {
                                                        custsIdArr.push(a.id)
                                                }}
                                                console.log('array of id', custsIdArr)
                                                if (custsIdArr.includes(c.id)) {
                                                    let i = custChosen.indexOf(c)
                                                    custChosen.splice(i, 1)
                                                    setCustChosen(custChosen)
                                                    // setChosen(false)
                                                } else {
                                                    custChosen.push(c)
                                                    setCustChosen(custChosen)
                                                    // setChosen(true)
                                                }
                                                // setCustChosen(custChosen)
                                                console.log('inside click ', custChosen)
                                            }}
                                            id = 'style'
                                            >Choose</button> */}
                                            
                                        </div>
                                    </div>))} 
                            </div> : null}
                        </div>
                    <button type="submit">
                        Post
                    </button>

            </form>
        </div>
    )

}

export default CreatePost;
