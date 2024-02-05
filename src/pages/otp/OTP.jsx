// import axios from 'axios';
// import React, { useState } from 'react'
// import { useLocation } from 'react-router-dom';

// const OTP = () => {
//     const [value, setValue] = useState('');
//     const location = useLocation()
//     const [user,setuser] = useState(location.state?.data)
//     const handleInputChange = (e) => {
//         setValue(e.target.value.replace(/[^0-9]/g, ''));
//       };

//       const onSubmit = async () => {
//         try{
//             const res = await axios.post(process.env.REACT_APP_API_URL+"user/register/"+value, user)
//             console.log(res.data)
//         }catch(err){

//         }
//       }
//       console.log(process.env.REACT_APP_API_URL)
//   return (
//     <div>
//       <input onChange={handleInputChange} type="text" />
//       <button onClick={()=>onSubmit()}>Submit</button>
//     </div>
//   )
// }

// export default OTP

// OTP.js

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './otp.scss'; // Import the CSS file
import { AuthContext } from '../../context/AuthContext';
import { BeatLoader } from 'react-spinners';



const OTP = () => {

// import ReactGA from 'react-ga';
  const [values, setValues] = useState(['', '', '', '']);
  const location = useLocation();
  const [userr, setUser] = useState(location.state?.data);
  const {user,loading, dispatch} = useContext(AuthContext)
  const navigate = useNavigate()

  const [err,seterr] = useState()

  


  const handleInputChange = (e, index) => {
    const newValue = e.target.value.replace(/[^0-9]/g, '');
    const newValues = [...values];
    newValues[index] = newValue;
    setValues(newValues);

    // Auto-focus the next input
    if (newValue !== '' && index < values.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };
console.log(values.join(""))
  const onSubmit = async () => {
    setLoader(true)
    dispatch({type:"LOGIN_START"})
    try {
      const otpValue = values.join('');
      const res = await axios.post(process.env.REACT_APP_API_URL + "user/register/"+otpValue+"/"+userr.phonenumber, userr);
      if(res.data.useravailableOTP){
          setLoader(false)
          seterr("Invalid code")
      }else if(res.data.useravailable){
        setLoader(false)
         seterr("Phonenumber already exist")
      }else{
        dispatch({type:"LOGIN_SUCCESS", payload: res.data})
                        // console.log(res.data)
                        setLoader(false)
                        navigate("/", { replace: true })

      }
    //   console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const [loader, setLoader] = useState(false)



  return (
    <div className='life'>
    {loader && <div className="loaderb">
            <BeatLoader color="hsla(42, 89%, 65%, 1)" />
        </div>}
    <div className="otp-container">
        
      <div className='h2'>Enter Code to Continue</div>
      {err && <div className="error">{err}</div>}
      <div className="otp-input-container">
        {values.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            className="otp-input"
            type="text"
            maxLength="1"
            value={value}
            onChange={(e) => handleInputChange(e, index)}
          />
        ))}
      </div>
      <button className='buttonotp' onClick={onSubmit}>Submit</button>
    </div>
    </div>
  );
};

export default OTP;
