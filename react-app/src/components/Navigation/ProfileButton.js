import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, authenticate, logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useHistory } from "react-router-dom";
import * as cartActions from '../../store/cart';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const currentCart = useSelector((state)=> state.carts.currentCart)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  useEffect(()=> {
    if(user) dispatch(cartActions.getCurrentCartThunk());
  },[dispatch])

  const handleLogout = async (e) => {
    e.preventDefault();
    if(currentCart.customizations?.length > 0){
      for (let c of currentCart.customizations) {
        await dispatch(cartActions.removeFromCartThunk(c))
      }
    }
    if(currentCart.drinks?.length > 0) {
      for (let d of currentCart.drinks) {
        await dispatch(cartActions.removeFromCartThunk(d))
      }
    }
    await dispatch(logout());
    await dispatch(cartActions.actionClearCart())
    history.push('/drinks')
  };

  const manageCustClick = (e) =>{
    e.preventDefault();
  }
  const cartClick = (e) =>{
    e.preventDefault();
  }
  const demoBossSubmitHandler = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("boss@g.com", "123123"))
    await dispatch(cartActions.createCartThunk(user))
    await closeMenu();
    history.push('/drinks')
  };
    const demoUserSubmitHandler = async (e) => {
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"))
    await dispatch(cartActions.createCartThunk(user))
    await closeMenu();
    history.push('/drinks')
    
  };
  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);


  return (
    <>
      <button className='navButton' onClick={openMenu}>
        <img style={{
          height:"42px"
          , width:"42px"
          , borderRadius:"50%"
        }}
        alt="profile_pic"
        src={user.profilePic}/>
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>Available Funds: ${user.funds.toFixed(2)}</li>
            {user.username === 'boss' || user.username === 'brista' ? (
              <li>
                <button onClick={cartClick}>
                  <NavLink to={`/carts`} className="navLink">Sales Report</NavLink>
                </button>
              </li> 
            ) : null
            }
            {user.username === 'boss' ? (
              <li>
                <button onClick={cartClick}>
                  <NavLink to={`/carts/unprocessed`} className="navLink">Current Orders</NavLink>
                </button>
              </li> 
            ) : null
            }
            
            {/* <li>
              <button>
                Add More Funds
              </button>
            </li> */}
            <li>
              <button onClick={manageCustClick}>
                <NavLink to={`/customizations`} className='custButton'>My Favorites</NavLink>
              </button>
            </li>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
            <li>
            {user.username === 'boss' ? (
              <button onClick={demoUserSubmitHandler}>Customer Mode</button>
            ):(
            <button onClick={demoBossSubmitHandler}>Staff Mode</button>)}
              
            </li>
          </>
        ) : (
          <>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />

            <OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
