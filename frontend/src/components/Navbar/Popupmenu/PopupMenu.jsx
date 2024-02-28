import React, { useContext } from 'react'
import "./popupmenu.css";
import { Link } from 'react-router-dom';
import { ProfileContext } from '../../../App';
import { useMsal } from '@azure/msal-react';
import { handleLogin, handleLogout } from '../../../authConfig';

const PopupMenu = ({setTogglePopupMenu}) => {
  const {profile,setProfile} = useContext(ProfileContext);
  const {instance} = useMsal();
  return (
    <div className='popupmenucontainer'>
        <ul id='popupmenulist'>
            <li>
              <Link onClick={()=>setTogglePopupMenu(c=>!c)} className='popupmenulinks' to={"/add"} >Add Word</Link>
            </li>
            <li>
              {
                profile.account!==null?
                  <button className='signbutton' onClick={()=>{setTogglePopupMenu(C=>!C);handleLogout("popup",instance,setProfile)}}>Sign Out</button>
                      :
                  <button className='signbutton' onClick={()=>{setTogglePopupMenu(C=>!C);handleLogin("popup",instance,setProfile)}}>Sign In</button>
              }
              
            </li>
        </ul>
    </div>
  )
}

export default PopupMenu