import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import {useModal} from "../../context/Modal"
import * as customizationActions from '../../store/customization';
import './CreateCustomization.css'
const CreateCustomization = (drink) => {
    
    const milks = ['Choose','None', 'Whole Milk', '2%', 'HalfNHalf', 'Fat Free'];
    const sizes = ['Choose','Tall', 'Grande', 'Venti'];
    const shots = ['Choose', 1, 2, 3];
    const expressos = ['Choose', "Blonde", "Medium Roast", "Dark Roast"];
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const user = useSelector((state)=>state.session.user)
    const [size, setSize] = useState('');
    const [milk, setMilk] = useState('');
    const [shotOptions, setshotOptions] = useState(0);
    const [expressoRoastOptions, setexpressoRoastOptions] = useState('');
    const [errors, setErrors] = useState({});
    const [resErrors, setResErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const currentUser = useSelector((state) => state.session.user)
    

    //for handling errors
    useEffect(()=>{
        const err = {};
        if(!size.length) err.size = "Please choose a size."
        if(!milk.length) err.milk = "Please choose a milk option"
        if(shotOptions === 0) err.shotOptions = "Please add a shot"
        if(!expressoRoastOptions.length) err.expressoRoastOptions = 'Please choose a kind of expresso'

        setErrors(err);
    },[size, milk, shotOptions, expressoRoastOptions]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        setResErrors({});
    
        let user_id = currentUser.id
        let drink_id = drink.drink.id
        let cart_id = 1
        if (!Boolean(Object.values(errors).length)) {
      const createdRes = await dispatch(
        // pinsAction.createPin(newPin, currentUser)
        customizationActions.createCustomizationThunk({
            size,
            milk,
            shotOptions,
            expressoRoastOptions,
            user_id,
            drink_id,
            cart_id
        })
      );
      if (!createdRes.errors) {
        // history.push(`/customizations`);
        closeModal();
        history.push(`/customizations/${createdRes.id}`);
        await reset();
      } else {
        await setResErrors(createdRes.errors);
      }
    }
    }

    const reset = () => {
        setSize('');
        setMilk('');
        setshotOptions(0);
        setexpressoRoastOptions('');
        setErrors({});
        setResErrors({});
        setHasSubmitted(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <ul>
                    {hasSubmitted && Boolean(Object.values(resErrors).length) ? (
                        <li>{Object.values(resErrors)}</li>
                    ) : null}
                </ul>
                <div>
                    <div>
                        <label>Choose size: </label>
                        {/* <p>* size is required</p> */}
                        <select
                        onChange={(e)=> {
                            setSize(e.target.value);
                        }}
                        value = {size}
                        name="size"
                        placeholder="Choose size"
                        >
                            {sizes.map((s)=>(
                                <option value={s} key={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        {hasSubmitted ? (
                            <p className="error"> {errors.size}</p>
                        ) : (
                            <p className="noErrorDisplay">{"  "}</p>
                        )}
                    </div>
                    <div>
                        <label>Choose Milk: </label>
                        <select
                        onChange={(e)=> {
                            setMilk(e.target.value);
                        }}
                        value = {milk}
                        name="milk"
                        placeholder="Choose milk"
                        >
                            {milks.map((m)=>(
                                <option value={m} key={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                        {hasSubmitted ? (
                            <p className="error"> {errors.milk}</p>
                        ) : (
                            <p className="noErrorDisplay">{"  "}</p>
                        )}
                    </div>
                    <div>
                        <label>Choose shotOptions: </label>
                        <select
                        onChange={(e)=> {
                            setshotOptions(e.target.value);
                        }}
                        value = {shotOptions}
                        name="shotOptions"
                        placeholder="Choose shotOptions"
                        >
                            {shots.map((o)=>(
                                <option value={o} key={o}>
                                    {o}
                                </option>
                            ))}
                        </select>
                        {hasSubmitted ? (
                            <p className="error"> {errors.shotOptions}</p>
                        ) : (
                            <p className="noErrorDisplay">{"  "}</p>
                        )}
                    </div>
                    <div>
                        <label>Choose expressoRoastOptions: </label>
                        <select
                        onChange={(e)=> {
                            setexpressoRoastOptions(e.target.value);
                        }}
                        value = {expressoRoastOptions}
                        name="expressoRoastOptions"
                        placeholder="Choose expressoRoastOptions"
                        >
                            {expressos.map((e)=>(
                                <option value={e} key={e}>
                                    {e}
                                </option>
                            ))}
                        </select>
                        {hasSubmitted ? (
                            <p className="error"> {errors.expressoRoastOptions}</p>
                        ) : (
                            <p className="noErrorDisplay">{"  "}</p>
                        )}
                    </div>
                    <button type="submit">
                    Create Me
                    </button>
                </div>
            </form>
            {/* <button
            onClick = {async (e) => {
                e.preventDefault();
                await closeModal()
            }}
            >Cancel</button> */}
        </div>

    )






    
}

export default CreateCustomization;