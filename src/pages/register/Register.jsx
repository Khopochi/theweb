import React, { useContext, useState } from 'react';
import './register.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../image/Jia Bai Li World-3.png'

export const Register = () => {
    //console log
    const {user,loading, dispatch} = useContext(AuthContext)
    const navigate = useNavigate()

    //habdkle digits only
    const [value, setValue] = useState('');
    const handleInputChange = (e) => {
        setValue(e.target.value.replace(/[^0-9]/g, ''));
        setEP(false)
      };

      const [credentials, setCredentials]  = useState({
        firstname: undefined,
        lastname: undefined,
        password: undefined,
        phonenumbear: undefined,
        confirm: undefined

      })
      const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
        console.log(e.target.id)
        if(e.target.id === 'firstname'){
            setEF(false)
        }
        if(e.target.id === 'phonenumber'){
            setEP(false)
        }
        if(e.target.id === 'password'){
            setPass(false)
        }
        if(e.target.id === 'confirm'){
            setPASS2(false)
        }


      }


      const [errf, setEF] = useState(false)
      const [errP, setEP] = useState(false)
      const [errpass, setPass] = useState()
      const [errpaas2, setPASS2] = useState(false)
      const [loader,setLoader] = useState(false)
      const [wordPhone, setWordPhone] = useState()
      const [wordPass, setWordPass] = useState()

      const handleRegister = async () => {
        // Check if firstname is empty or undefined
        if (!credentials.firstname?.trim()) {
          setEF(true);
        } else {
          setEF(false);
        }
    
        // Check if phonenumber is empty or undefined
        if (!value?.trim()) {
          setEP(true);
          setWordPhone("Fill in Phone number")
        } else {
          setEP(false);
        }

        if (value?.trim().length != 9) {
           setWordPhone("Number should be 9 digits")            
            setEP(true);
          } else {
            setEP(false);
          }
    
        // Check if password is empty or undefined
        if (!credentials.password?.trim()) {
          setPass(true);
        } else {
          setPass(false);
        }
    
        // Check if confirmPassword is empty or undefined
        if (!credentials.confirm?.trim()) {
          setPASS2(true);
          setWordPass("Fill in Password")
        } else {
          setPASS2(false);
        }
    
        // If all fields are filled, log a success message
        if (credentials.confirm?.trim() && credentials.password?.trim() && value?.trim() && (value?.trim().length >= 9) &&  credentials.firstname?.trim()) {
            if(credentials.confirm?.trim() === credentials.password?.trim() ){
            let data = {
                firstname: credentials.firstname.trim(),
                lastname: credentials.lastname?.trim(),
                phonenumber: value.trim(),
                password: credentials.password.trim()  
            }
          try{
            setLoader(true)
            const tempuser = {
              phonenumber: data.phonenumber,
              code: getRandomNumber()
            }
            //console.log(tempuser)
            const res = await axios.post(process.env.REACT_APP_API_URL+"user/temp", tempuser)
            setLoader(false)
            if(res.data.phonenumber){
             
              navigate("/ottp/", {state: {data}})
            }else{
                setEP(true)
                setWordPhone("Phone number already exist")            

            }
          }catch(err){

          }
            }else{
                setPASS2(true)
                setWordPass("Passwords dont match")

            }
      };
    }

    const getRandomNumber = () => {
      // Generate a random number between 1000 and 9999
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      return randomNumber;
    };



  return (
    <div className="registerPage">
        {loader && <div className="loaderb">
            <BeatLoader color="hsla(42, 89%, 65%, 1)" />
        </div>}
        <div className="title">
            <img src={logo} alt="" />
        </div>
        <div className="registerArea">
            <div className="title">
                Create Account
            </div>
            <div className="fname">
                <div className="name">Firstname</div>
                {errf && <div className="error">Fill in first name</div>}
                <input id='firstname' onChange={handleChange} type="text" placeholder='Firstname' className="fnmae" />
            </div>
            <div className="fname">
                <div className="name">Last name</div>
                <input id='lastname' onChange={handleChange} type="text" placeholder='Last name (optional)' className="fnmae" />
            </div>
            <div className="fname phone">
                 <div className="name">Phone Number</div>
                {errP && <div className="error">{wordPhone}</div>}
                <div className="inputarea">
                    <span>+265</span>
                    <input type="text" maxLength={9} value={value} onChange={handleInputChange}  className="phoneinput" />
                </div>
                
            </div>
            <div className="fname">
                <div className="name">Password</div>
                {errpass && <div className="error">error pass</div>}
                <input id='password' onChange={handleChange} type="text" className="fnmae" />
                <div className='passadvice'>
                    <span><FontAwesomeIcon icon={faInfoCircle} /></span>
                    Passwords must be at least 6 characters
                    </div>
            </div>
            <div className="fname">
                <div className="name">Re-enter password</div>
                {errpaas2 && <div className="error">{wordPass}</div>}
                <input id='confirm' onChange={handleChange} type="text"  className="fnmae" />
            </div>

            <div className="fname">
                <button onClick={()=>handleRegister()}>Continue</button>
            </div>

            <div className="fname">
                <div className="termsandconditions">
                By creating an account, you agree to <span onClick={()=>navigate("/terms/")} className='link'>JiaBaiLi's Supermarket Conditions of Use</span> and <span onClick={()=>navigate("/terms/")} className='link'>Privacy Notice</span>.
                </div>
            </div>

            <div className="fname">
                <div className="divider"></div>
            </div>

            <div className="fname">
                <div className="termsandconditions1">
                    Already have an Account? <span onClick={()=>navigate("/login/")} className='link'>Sign in</span>
                </div>
            </div>
        </div>
        <div className="conclusion">
            @JiaBaiLi.shop, 2018-2023
        </div>
    </div>
  )
}
