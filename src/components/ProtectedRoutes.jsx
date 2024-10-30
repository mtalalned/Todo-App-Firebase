import React, { useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../Config/firebaseconfig';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({component}) => {
  
    const navigate = useNavigate()

    onAuthStateChanged(auth, (user) => {
        if (user) {
        const uid = user.uid;
        // ...
      } else {
        navigate ('/')
    }
    });

    return (
        <>
        {component}
        </>
  )
}

export default ProtectedRoutes
