import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';

import * as customizationActions from '../../store/customization';

const Customization = (drink) => {
    const dispatch = useDispatch();
    const user = useSelector((state)=>state.session.user)
    
    return (
        <div>

        </div>
    )
}

export default Customization;