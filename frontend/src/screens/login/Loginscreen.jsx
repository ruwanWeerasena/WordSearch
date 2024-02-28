// import React, { useContext, useEffect, useState } from 'react'
// import "./loginscreen.css";
// import {Link} from 'react-router-dom';
// import {FcGoogle} from "react-icons/fc"
// import { GoogleLogin } from '@react-oauth/google';
// import { ProfileContext } from '../../App';
// import axios from 'axios';

// const Loginscreen = () => {
//   const {profile,setProfile} = useContext(ProfileContext)
//   console.log(profile);
//   const handleLogin = async(token)=>{
//     await axios.post("/auth/login/google",{
//       Token : token
//     }).then(
//       (res)=>{
//         setProfile(res.data)
//       }
//       )
 
    
//   }

//   return (
//     <div className='logincontainer'>
//       <div className='loginborder'>
//         <div className='sectionheading'>
//           <p>Login Here</p>
//         </div>
//         <div  className='sectionemail'>
//           <input type='text' placeholder='Email or Username' />
//         </div>
//         <div className='sectionpassword'>
//           <input type='text' placeholder='Password' />
//         </div>
//         <div className='sectionlogin'>
//           <button>Login</button>
//         </div>
//         <div className='externallogins'>
//           <div>OR</div>
//           <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
//             <GoogleLogin
//                onSuccess={credentialResponse => {
//                 handleLogin(credentialResponse.credential)
//               }}
//               onError={() => {
//                 console.log('Login Failed');
//               }}
//             />
//           </div>
//         </div>
//         <div className='sectiontext'>
//           <Link id='sectiontextLink' to={"/signup"}>You dont have a account?</Link>
//         </div>
//       </div>  
//     </div>
//   )
// }

// export default Loginscreen