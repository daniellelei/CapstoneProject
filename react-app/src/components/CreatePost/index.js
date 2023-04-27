import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as postsAction from "../../store/post";
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

    const customizations = ((state)=>state.customizations.allUserCustomizations)
    const [custChosen, setCustChosen] = useState([]);

    useEffect(()=>{
        dispatch(customizationActions.getUserCustomizationThunk(user_id))

        return () => dispatch(customizationActions.actionClearSavedCustomizations())
    },[dispatch])



    useEffect(()=>{
        const err = {};
        if(caption.length<5) err.caption = 'Caption needs to be at least 5 characters long.'
        if(!image.length) err.image = 'Image is required'
        if(!image.includes('.jpg')||!image.includes('.png')) err.image = 'Image is not valid'

        setErrors(err);
    },[caption, image])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        setResErrors({});

        if(!Boolean(Object.values(errors).length)) {
            const createdRes = await dispatch(
                postsAction.createPost({
                    caption,
                    image,
                    user_id,
                    custChosen,
                })
            )
        }
    }

}

export default CreatePost;
