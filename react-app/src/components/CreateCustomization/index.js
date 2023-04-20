import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import {useModal} from "../../context/Modal"
import * as customizationActions from '../../store/customization';

const CreateCustomization = (drink) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const user = useSelector((state)=>state.session.user)
    const [size, setSize] = useState('');
    const [milk, setMilk] = useState('');
    const [shotOptions, setShotOptions] = useState(0);
    const [expressoRoastOptions, setexpressoRoastOptions] = useState('');
    const [errors, setErrors] = useState({});

    const currentUser = useSelector((state) => state.session.user)

    //for handling errors
    useEffect(()=>{
        const err = {};
        if(!size.length) err.size = "Please choose a size."
        if(!milk.length) err.milk = "Please choose a milk option"
        if()
    })






    return (
        <div>

        </div>
    )
}

export default CreateCustomization;