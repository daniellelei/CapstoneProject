import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";

const AfterCheckOut = () => {
    return (
        
        <div>
            <h1>Your drinks will be ready in 3 to 5 minutes!</h1>
            <h3>Thanks for your order!</h3>
        </div>
    )
}

export default AfterCheckOut;