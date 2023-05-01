import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import {useModal} from "../../context/Modal"
import * as customizationActions from '../../store/customization';
import './EditCustomization.css'
const EditCustomization = ({customization}) => {
    const milks = ['None', 'Whole Milk', '2%', 'HalfNHalf', 'Fat Free'];
    const sizes = ['Tall', 'Grande', 'Venti'];
    const shots = [1, 2, 3];
    const expressos = ["Blonde", "Medium Roast", "Dark Roast"];
    const toppingss = [ 'None','Caramel Crunch Topping', 
    'Cookie Crumble Topping', 'Salted Caramel Cream Cold Foam',
    'Vanilla Sweet Cream Cold Foam']
    const flavorss = [ 'None', 'Brown Sugar Syrup', 'Caramel Syrup',
    'Hazelnut Syrup', 'Raspberry Syrup', 'Toffeenut Syrup', 
    'White Chocolate Mocha Sauce']
    const addInss = [ 'None','Chocolate Malt Powder', 'Vanilla Bean Powder', 'Creamer', 'More ice']
    const sweetenerss = [ 'None','Sugar', 'Honey', 'Splenda', 'Classic Syrup']
    const teaBases = [ 'None', 'Black Tea', 'Jasmine Green Tea', 'Oolong Green Tea']
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const [size, setSize] = useState(customization.size);
    const [milk, setMilk] = useState(customization.milk);
    const [shotOptions, setshotOptions] = useState(customization.shotOptions);
    const [expressoRoastOptions, setexpressoRoastOptions] = useState(customization.expressoRoastOptions);
    const [toppings, setToppings] = useState(customization.toppings);
    const [flavors, setFlavors] = useState(customization.flavors);
    const [addIns, setAddIns] = useState(customization.addIns);
    const [sweeteners, setSweeteners] = useState(customization.sweeteners);
    const [teaBase, setTeaBase] = useState(customization.teaBase);
    const [errors, setErrors] = useState({});
    const [resErrors, setResErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const currentUser = useSelector((state) => state.session.user)

    useEffect(()=>{
        const err = {};
        if(!size.length) err.size = "Please choose a size."
        if(!milk.length) err.milk = "Please choose a milk option"
        if(shotOptions === 0) err.shotOptions = "Please add a shot"
        if(!expressoRoastOptions.length) err.expressoRoastOptions = '* Please choose a kind of expresso'
        if(!teaBase.length) err.teaBase = '* Plaeas choose a kind of tea'
        

        setErrors(err);
    },[size, milk, shotOptions, expressoRoastOptions, teaBase]);

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
            toppings,
            flavors,
            addIns,
            sweeteners,
            teaBase,
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
        <div className="editPage">
            <h2>Edit customization</h2>
            <form onSubmit={handleSubmit} className="editForm">
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
                    <button type="submit">
                    Update
                    </button>
                </div>
                <button
                onClick = {async (e) => {
                    e.preventDefault();
                    await closeModal()
                }}
                >Cancel</button>
            </form>
        </div>


    )
}

export default EditCustomization;