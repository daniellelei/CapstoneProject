import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import {useModal} from "../../context/Modal"
import * as customizationActions from '../../store/customization';

const CreateCustomization = (drink) => {
    const milks = ['None', 'Whole Milk', '2%', 'HalfNHalf', 'Fat Free'];
    const sizes = ['Tall', 'Grande', 'Venti'];
    const shotOptions = [1, 2, 3];
    const expressoRoastOptions = ["Blonde", "Medium Roast", "Dark Roast"];
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const user = useSelector((state)=>state.session.user)
    const [size, setSize] = useState('');
    const [milk, setMilk] = useState('');
    const [shotOption, setShotOption] = useState(0);
    const [expressoRoastOption, setExpressoRoastOption] = useState('');
    const [errors, setErrors] = useState({});
    const [resErrors, setResErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const currentUser = useSelector((state) => state.session.user)
    console.log('user data', currentUser);

    //for handling errors
    useEffect(()=>{
        const err = {};
        if(!size.length) err.size = "Please choose a size."
        if(!milk.length) err.milk = "Please choose a milk option"
        if(shotOption === 0) err.shotOption = "Please add a shot"
        if(!expressoRoastOption.length) err.expressoRoastOption = 'Please choose a kind of expresso'

        setErrors(err);
    },[size, milk, shotOption, expressoRoastOption]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        setResErrors({});
        const formData = new FormData()
        formData.append("size", size)
        formData.append("milk", milk)
        formData.append("shotOptions", shotOption)
        formData.append("expressoRoastOptions", expressoRoastOption)
        formData.append("user_id", currentUser.id)
        formData.append("drink_id", drink.id)
        formData.append("cart_id", 1) //need to change later on
        
        if (!Boolean(Object.values(errors).length)) {
      const createdRes = await dispatch(
        // pinsAction.createPin(newPin, currentUser)
        customizationActions.createCustomizationThunk(formData)
      );
      if (!createdRes.errors) {
        // history.push(`/customizations`);
        closeModal();
        // history.push(`/customizations/${createdRes.id}`);
        await reset();
      } else {
        await setResErrors(createdRes.errors);
      }
    }
    }

    const reset = () => {
        setSize('');
        setMilk('');
        setShotOption(0);
        setExpressoRoastOption('');
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
                        <label>Choose shotOption: </label>
                        <select
                        onChange={(e)=> {
                            setShotOption(e.target.value);
                        }}
                        value = {shotOption}
                        name="shotOption"
                        placeholder="Choose shotOption"
                        >
                            {shotOptions.map((o)=>(
                                <option value={o} key={o}>
                                    {o}
                                </option>
                            ))}
                        </select>
                        {hasSubmitted ? (
                            <p className="error"> {errors.shotOption}</p>
                        ) : (
                            <p className="noErrorDisplay">{"  "}</p>
                        )}
                    </div>
                    <div>
                        <label>Choose expressoRoastOption: </label>
                        <select
                        onChange={(e)=> {
                            setExpressoRoastOption(e.target.value);
                        }}
                        value = {expressoRoastOption}
                        name="expressoRoastOption"
                        placeholder="Choose expressoRoastOption"
                        >
                            {expressoRoastOptions.map((e)=>(
                                <option value={e} key={e}>
                                    {e}
                                </option>
                            ))}
                        </select>
                        {hasSubmitted ? (
                            <p className="error"> {errors.expressoRoastOption}</p>
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

export default CreateCustomization;