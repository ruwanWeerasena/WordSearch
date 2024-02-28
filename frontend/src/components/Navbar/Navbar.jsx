import React, { useContext, useState } from 'react'
import './navbar.css'
import {GiHamburgerMenu} from 'react-icons/gi'
import {RxAvatar} from 'react-icons/rx'
import {AiOutlineClose} from 'react-icons/ai'
import { Link, useNavigate } from "react-router-dom";
import PopupMenu from './Popupmenu/PopupMenu';
import { ProfileContext } from '../../App';
import { useMsal } from '@azure/msal-react'
import { handleLogin } from '../../authConfig'
const Navbar = () => {
  const navigate= useNavigate();
  const {profile,setProfile} = useContext(ProfileContext)
  const { instance } = useMsal();

  const [toggleResponsivePopupMenu, setToggleResponsivePopupMenu] = useState(false)
  const [togglePopupMenu, setTogglePopupMenu] = useState(false)
  return (
    <div className='navbar'>
        <div className='logosection'>
          <img onClick={()=>navigate("./")} src='images/logo.png' alt='logo here'/>
        </div>

        <div className='buttonsection'>
          <div className='authsection'>
            <Link to={"/add"} id='addwordbutton'>Add Word</Link>
            {
              profile.token===null ?<button id='btnmainSignin' onClick={()=>{handleLogin("popup",instance,setProfile)}} >Sign In</button>: 
              
              togglePopupMenu?
                <AiOutlineClose onClick={()=>setTogglePopupMenu(c=>!c)} size={40} />
                :
                <RxAvatar onClick={()=>setTogglePopupMenu(c=>!c)} size={40}/>
                
            }
            {
              togglePopupMenu && <PopupMenu setTogglePopupMenu={setTogglePopupMenu}/>
            }
            
          </div>
          <div className='hamburgermenu'>
            {
              toggleResponsivePopupMenu?
                <AiOutlineClose onClick={()=>setToggleResponsivePopupMenu(c=>!c)} size={40} />
                    : 
                <GiHamburgerMenu onClick={()=>setToggleResponsivePopupMenu(c=>!c)}  size={40}/>
            }
            {
              toggleResponsivePopupMenu && <PopupMenu setTogglePopupMenu={setToggleResponsivePopupMenu}/>
            }
          </div>
        </div>
    </div>
  )
}

export default Navbar