import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import {useModal} from "../../context/Modal"
import * as customizationActions from '../../store/customization';

const EditCustomization = ({customization}) => {
    const milks = ['None', 'Whole Milk', '2%', 'HalfNHalf', 'Fat Free'];
    const sizes = ['Tall', 'Grande', 'Venti'];
    const shots = [1, 2, 3];
    const expressos = ["Blonde", "Medium Roast", "Dark Roast"];
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [size, setSize] = useState(customization.size);
    const [milk, setMilk] = useState(customization.milk);
    const [shotOptions, setshotOptions] = useState(customization.shotOptions);
    const [expressoRoastOptions, setexpressoRoastOptions] = useState(customization.expressoRoastOptions);
    const [errors, setErrors] = useState({});
    const [resErrors, setResErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const currentUser = useSelector((state) => state.session.user)

    // useEffect(()=>{
    //     if (customization) {
    //         setSize(cu)
    //     }
    // })
    // const updateSize = (e) => setSize(e.target.value);
    // const updateMilk = (e) => setMilk(e.target.value);
    // const updateshotOptions = (e) => setshotOptions(e.target.value);
    // const updateexpressoRoastOptions = (e) => setexpressoRoastOptions(e.target.value);

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
        let drink_id = customization.drink_id
        let cart_id = 1
        let id = customization.id
        if (!Boolean(Object.values(errors).length)) {
      const updatedRes = await dispatch(
        // pinsAction.createPin(newPin, currentUser)
        customizationActions.updateCustomizationThunk({
            size,
            milk,
            shotOptions,
            expressoRoastOptions,
            user_id,
            drink_id,
            cart_id,
            id
        })
      );
      if (!updatedRes.errors) {
        // history.push(`/customizations`);
        closeModal();
        
        await setHasSubmitted(false);
      } else {
        await setResErrors(updatedRes.errors);
      }
    }
    }
    
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
                    Create
                    </button>
                </div>
            </form>
            <button
            onClick = {async (e) => {
                e.preventDefault();
                await closeModal()
            }}
            >Cancel</button>
        </div>


    )







}

export default EditCustomization;