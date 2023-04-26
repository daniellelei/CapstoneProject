import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { NavLink, useHistory } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push('/drinks')
  };

  const manageCustClick = (e) =>{
    e.preventDefault();
  }
  const cartClick = (e) =>{
    e.preventDefault();
  }


  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className='navButton'onClick={openMenu}>
        <i className="fa-solid fa-user"></i>
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
