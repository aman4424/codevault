import { useContext } from "react";
import {AuthContext} from "../contexts/AuthContext";
 import React from 'react'
 
 const useAuth = () => {
   return useContext(AuthContext);
 }
 
 export default useAuth
 