import React, { useContext, useState } from 'react';
import './login.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faInfoCircle, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import logo from '../../image/Jia Bai Li World-3.png'


export const Login = () => {

    //navigate
    const navigate = useNavigate()
    //habdkle digits only
    const [value, setValue] = useState('');
    const handleInputChange = (e) => {
        setValue(e.target.value.replace(/[^0-9]/g, ''));
        setError(false)
        setError2(false)

      };
      //CREDETIALS
      const [credentials,setCredentials] = useState({
        password: undefined
      })
      const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
        setError1(false)
        setError3(false)

      }



      //login actions
      const {user,loading, dispatch} = useContext(AuthContext)
      const [error,setError] = useState(false)
      const [error1,setError1] = useState(false)
      const [error2,setError2] = useState(false)
      const [error3,setError3] = useState(false)
      const [server,setserver] = useState(undefined)
      const [server1,setserver1] = useState(undefined)
      const [loader,setLoader] = useState(false)
      const login = async () => {

        dispatch({type:"LOGIN_START"})
        const lodinData = {
            phonenumber: value,
            password: credentials.password
        }
        setLoader(true)
        if(value.length <= 0){
            setError(true)
            setserver("Fill in Phonenumber")
            setLoader(false)


        }else{
            if(!credentials.password || credentials.password?.length <= 0){
                setError1(true)
                setserver("Fill in Password")
                setLoader(false)

            }else{
                try{
                    const res = await axios.post(process.env.REACT_APP_API_URL+"user/login",lodinData)
                    if(res.data.error){
                        if(res.data.error ===  "No user"){
                            setserver("Phonenumber does not exist")
                            setError2(true)
                            setLoader(false)

                        }else{
                            setserver("Wrong Password")
                            setError3(true)
                            setLoader(false)

                        }
                    }else{
                        dispatch({type:"LOGIN_SUCCESS", payload: res.data})
                        console.log(res.data)
                        setLoader(false)
                        navigate("/")
                            
                    }
        
        
                    
                }catch(err){
                        dispatch({type:"LOGIN_FAILURE", payload:err.response.data})
                }
            }
        }
      }



  return (
    <div className="loginPage">
        {loader && <div className="loaderb">
            <BeatLoader color="hsla(42, 89%, 65%, 1)" />
        </div>}
        <div className="title">
            <img src={logo} alt="" />
        </div>
        <div className="registerArea">
            <div className="title">
                Sign In
            </div>
            <div className="fname phone">
                <div className="name">Phone Number</div>
                {(error || error2) && <div className="error">{server}</div>}
                <div className="inputarea">
                    <span>+265</span>
                    <input type="text" maxLength={9} value={value} onChange={handleInputChange}  className="phoneinput" />
                </div>
                
            </div>
            <div className="fname">
                <div className="name">Password</div>
                {(error1 || error3) && <div className="error">{server}</div>}
                <input id='password' onChange={handleChange} type="password" className="fnmae" />
                <div className='passadvice'>
                    <span><FontAwesomeIcon icon={faQuestionCircle} /></span>
                    Forgot password?
                    </div>
            </div>
            <div className="fname">
                <button onClick={()=>login()}>Sign In</button>
            </div>

            <div className="fname">
                <div className="termsandconditions">
                By continuing, you agree to <span onClick={()=>navigate("/terms/")} className='link'>JiaBaiLi's Supermarket Conditions of Use</span> and <span onClick={()=>navigate("/terms/")} className='link'>Privacy Notice</span>.
                </div>
            </div>

            <div className="fname">
                <div className="divider"></div>
                
            </div>

            <div className="fname">
                <div className="termsandconditions1">
                    New to JiaBaiLi Online? <span onClick={()=>navigate("/register/")} className='link'>Create Account</span>
                </div>
            </div>
        </div>
        <div className="conclusion">
            @JiaBaiLi.shop, 2018-2023
        </div>
    </div>
  )
}
