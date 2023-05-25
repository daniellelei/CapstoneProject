import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import {useModal} from "../../context/Modal"
import * as customizationActions from '../../store/customization';
import './CreateCustomization.css'
import SignUpLoginModal from "../Signup_LoginModal";
import OpenModalButton from "../OpenModalButton";

const CreateCustomization = (drink) => {
    
    const milks = ['Choose an Option','None', 'Whole Milk', '2%', 'HalfNHalf', 'Fat Free'];
    const sizes = ['Choose an Option','Tall', 'Grande', 'Venti'];
    const shots = ['Choose an Option', 1, 2, 3];
    const expressos = ['Choose an Option', 'None', "Blonde", "Medium Roast", "Dark Roast"];
    const toppingss = ['Choose an Option', 'None','Caramel Crunch Topping', 
    'Cookie Crumble Topping', 'Salted Caramel Cream Cold Foam',
    'Vanilla Sweet Cream Cold Foam']
    const flavorss = ['Choose an Option', 'None', 'Brown Sugar Syrup', 'Caramel Syrup',
    'Hazelnut Syrup', 'Raspberry Syrup', 'Toffeenut Syrup', 
    'White Chocolate Mocha Sauce']
    const addInss = ['Choose an Option', 'None','Chocolate Malt Powder', 'Vanilla Bean Powder', 'Creamer', 'More ice']
    const sweetenerss = ['Choose an Option', 'None','Sugar', 'Honey', 'Splenda', 'Classic Syrup']
    const teaBases = ['Choose an Option', 'None', 'Black Tea', 'Jasmine Green Tea', 'Oolong Green Tea']
    
    const history = useHistory();
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    // const user = useSelector((state)=>state.session.user)
    const [size, setSize] = useState('');
    const [milk, setMilk] = useState('');
    const [shotOptions, setshotOptions] = useState(0);
    const [expressoRoastOptions, setexpressoRoastOptions] = useState('');
    const [toppings, setToppings] = useState('');
    const [flavors, setFlavors] = useState('');
    const [addIns, setAddIns] = useState('');
    const [sweeteners, setSweeteners] = useState('');
    const [teaBase, setTeaBase] = useState('');
    const [errors, setErrors] = useState({});
    const [resErrors, setResErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const currentUser = useSelector((state) => state.session.user)
    

    //for handling errors
    useEffect(()=>{
        const err = {};
        if(!size.length) err.size = "* Please choose a size."
        if(!milk.length) err.milk = "* Please choose a milk option"
        if(shotOptions === 0) err.shotOptions = "* Please add a shot"
        if(!expressoRoastOptions.length) err.expressoRoastOptions = '* Please choose a kind of expresso'
        if(!teaBase.length) err.teaBase = '* Plaeas choose a kind of tea'
        
        setErrors(err);
    },[size, milk, shotOptions, expressoRoastOptions, teaBase]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        
        setResErrors({});

        let user_id = currentUser?.id
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
            toppings,
            flavors,
            addIns,
            sweeteners,
            teaBase,
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
        setToppings('');
        setAddIns('');
        setFlavors('');
        setTeaBase('');
        setSweeteners('');
        setshotOptions(0);
        setexpressoRoastOptions('');
        setErrors({});
        setResErrors({});
        setHasSubmitted(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="custForm">
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
                        <label>Choose Shot Options: </label>
                        <select
                        onChange={(e)=> {
                            setshotOptions(e.target.value);
                        }}
                        value = {shotOptions}
                        name="shotOptions"
                        placeholder="Choose Shot Options"
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
                        <label>Choose Expresso Roast:</label>
                        <select
                        onChange={(e)=> {
                            setexpressoRoastOptions(e.target.value);
                        }}
                        value = {expressoRoastOptions}
                        name="expressoRoastOptions"
                        placeholder="Choose Expresso Roast Options"
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
                    
                    
                        <div>
                        <label>Choose Tea Base: </label>
                        <select
                        onChange={(e)=> {
                            setTeaBase(e.target.value);
                        }}
                        value = {teaBase}
                        name="teaBase"
                        >
                            {teaBases.map((e)=>(
                                <option value={e} key={e}>
                                    {e}
                                </option>
                            ))}
                        </select>
                        {hasSubmitted ? (
                            <p className="error"> {errors.teaBase}</p>
                        ) : (
                            <p className="noErrorDisplay">{"  "}</p>
                        )}
                    </div>
                    
                    <div>
                        <label>Choose Flavor (optional): </label>
                        <select
                        onChange={(e)=> {
                            setFlavors(e.target.value);
                        }}
                        value = {flavors}
                        name="flavors"
                        placeholder="Choose flavors"
                        >
                            {flavorss.map((m)=>(
                                <option value={m} key={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Choose Topping (optional): </label>
                        <select
                        onChange={(e)=> {
                            setToppings(e.target.value);
                        }}
                        value = {toppings}
                        name="toppings"
                        placeholder="Choose toppings"
                        >
                            {toppingss.map((m)=>(
                                <option value={m} key={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Choose AddIns (optional): </label>
                        <select
                        onChange={(e)=> {
                            setAddIns(e.target.value);
                        }}
                        value = {addIns}
                        name="addIns"
                        placeholder="Choose addIns"
                        >
                            {addInss.map((m)=>(
                                <option value={m} key={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Choose Sweeteners (optional): </label>
                        <select
                        onChange={(e)=> {
                            setSweeteners(e.target.value);
                        }}
                        value = {sweeteners}
                        name="sweeteners"
                        placeholder="Choose sweeteners"
                        >
                            {sweetenerss.map((m)=>(
                                <option value={m} key={m}>
                                    {m}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {currentUser ? (<button type="submit">
                    Create Me
                    </button> ): (<OpenModalButton 
                    buttonText= "Create Me"
                    modalComponent={<SignUpLoginModal />}
                />)}
                    
                    
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