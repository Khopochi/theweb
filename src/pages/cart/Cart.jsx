import React, { useContext, useEffect, useRef, useState } from 'react'
import './cart.scss'
import { Navbar } from '../../components/navbar/Navbar'
import { LowerNav } from '../../components/lowernav/LowerNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { SingleCart } from './SingleCart'
import { BeatLoader, ClipLoader } from 'react-spinners';
import { io } from 'socket.io-client';
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'



export const Cart = () => {
    const {user} = useContext(AuthContext)
    const [carts, setCarts] = useState()
    const [load,setLoad] = useState(true)


    //socket io operations
    //socket io
    const socket = useRef()

    // socketio open
    // const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    useEffect(()=>{
        socket.current = io("ws://localhost:8800")
    },[])
    useEffect(()=>{
        if(user){
        socket.current.emit("addUser", user._id)
        socket.current.on("getusers", (users)=>{
          setOnlineUsers(users)
        })
        }
    },[user?._id])
    console.log(onlineUsers)


    const [code, setCode] = useState(undefined)
    const [codemessage, setMessagecode] = useState()
    const [loadingtop, setLoadingTop] = useState(false)
    const [loadingtop1, setLoadingTop1] = useState(false)
    useEffect(()=>{
        socket.current.on("getMessage", (data)=>{
            setCode(data.code)
            setMessagecode(data.message)
        })
     },[])

    
 





    //socketio ends here

    const getCartDetaisl = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"user/getcartdetails/"+user._id)
            setCarts(res.data)
            setLoad(false)
        }catch(err){

        }
    }
    useEffect(()=>{
        getCartDetaisl()
    },[])

    //gwt user carts
    const [userCart, setUserCart] = useState()
    const [cartLoaded, setCartLoaded] = useState(false)
    const getUserCart = async () => {
        setCartLoaded(false)
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"user/usercarts/"+user._id)
            setUserCart(res.data)
            setCartLoaded(true)
        }catch(err){

        }
    }
    useEffect(()=>{
        if(user){
            getUserCart()
        }
    },[])
    const formatNumberWithCommas = (value) => {
        return value.toLocaleString('en-US');
      };
    const calculateTotal = (arr) => {
        if (!Array.isArray(arr) || arr.length === 0) {
          return 0; // Return 0 for an empty or non-array input
        }
      
        // Use reduce to sum up the values of the 'total' field
        const total = arr.reduce((acc, obj) => acc + (obj.cartTotal || 0), 0);
      
        return total;
      }

      const calculateTotalSTD = (arr) => {
        if (!Array.isArray(arr) || arr.length === 0) {
          return 0; // Return 0 for an empty or non-array input
        }
      
        // Use reduce to sum up the values of the 'total' field
        const total = arr.reduce((acc, obj) => acc + (obj.cartTotal || 0), 0);
      
        return total * 100;
      }

      const [newData,setData] = useState(true)
      const handleRefresh = (id) => {
        
        const updatedCartItems = carts.filter(item => item.cartid !== id);
        setCarts(updatedCartItems)
        getUserCart()
      }


      //payment options
      const [selectedPay, setSelectedPay] = useState()

      const setPayOption = (id) => {
        setSelectedPay(id)
      }
      const [iframe,setIframe] = useState()
      const payOrder = async () => {

       
        if(selectedPay === "airtel"){
            const orderinfo = {
                userid: user._id,
                cart: userCart,
                total: calculateTotal(carts),
                status: "Waiting payment",
                phone: user.phonenumber
            }
            setLoadingTop(true)
            try{
                const res = await axios.post(process.env.REACT_APP_API_URL+"transaction/airtel",orderinfo)

                //add this
                setorderid(res.data.data.transaction.id)
            }catch(err){

            }
        }else if(selectedPay === "STD"){
            const orderinfo = {
                userid: user._id,
                cart: userCart,
                total: calculateTotal(carts),
                status: "Waiting payment",
                phone: user.phonenumber,
                std: {
                    action: "AUTH",  
                    amount : { currencyCode : "MWK", value : calculateTotalSTD(carts) },
                }
            }
            setLoadingTop1(true)
            try{
                const res = await axios.post(process.env.REACT_APP_API_URL+"transaction/stdbank",orderinfo)
                setIframe(res.data.order._links.payment.href)
                setLoadingTop1(false)

            }catch(err){

            }
        }
      }

      const [orderid, setorderid] = useState()
      const [userData, setUserData] = useState(null);
      // Function to fetch user data based on userId
      const fetchOrder = async () => {
        try {
          // Assuming you have an API call to fetch user data
          const response = await axios.get(process.env.REACT_APP_API_URL+"ordersubmitted/getsinglebyorderid/"+orderid)
          setUserData(response.data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      useEffect(() => {
        if(orderid){const fetchData = async () => {
          try {
            // Your API call to fetch data
            const response = await axios.get(process.env.REACT_APP_API_URL+"ordersubmitted/getsinglebyorderid/"+orderid)
            setUserData(response.data);
            // Your logic with the fetched data
          } catch (error) {
            console.error('Error fetching data:', error);
            // Handle the error as needed
          }
        };
    
        const intervalId = setInterval(() => {
          fetchData();
        }, 3000);
    
        // Cleanup: Stop the interval after 1 minute (60,000 milliseconds)
        const timeoutId = setTimeout(() => {
          clearInterval(intervalId);
          console.log('Interval stopped after 1 minute');
        }, 60000);
    
        // Return cleanup function
        return () => {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          console.log('Cleanup: Interval cleared');
        };}
      }, [orderid]);

      console.log(userData)

      useEffect(()=>{
            if(userData){
                if(userData.status === "Paid"){
                    navigate("/completed/")
                }
            }
      },[userData])




      








      //ending here to add
      const navigate = useNavigate()
      useEffect(()=>{
        if(code === "TS"){
            navigate("/completed/")
        }
      },[code])
  return (
    <div className='cart'>
        {iframe && <div className="fadaiframe">
            {
                iframe && <iframe
                src={iframe}
                title="External Website"
                className='iframestd'
                frameBorder="0"
                allowFullScreen
            ></iframe>
            }
        </div>}
        {load && <div className="loader">
            <BeatLoader color="hsla(351, 84%, 49%, 1)" />
        </div>}
       {loadingtop &&  <div className="airtelpage">
            {!code && <div className="onloading">
                    <span className="icon"><ClipLoader color="#E3242B" /></span>
                    <span className="word">Waiting for payment...</span>
            </div>}
            {(code === "TF") && <div className="onfaled">
                    <span className="icon"><FontAwesomeIcon className="icon" icon={faCircleExclamation} /></span>
                    <span className="failed">Failed: {codemessage} </span>
            </div>}
            {(code === "TS") && <div className="onSuccess">
                    <span className="icon"><FontAwesomeIcon className="icon" icon={faCircleCheck} /></span>
                    <span className="failed">Payment received</span>
            </div>}
        </div>}
        {loadingtop1 &&  <div className="airtelpage">
            {!code && <div className="onloading">
                    <span className="icon"><ClipLoader color="#E3242B" /></span>
                    <span className="word">Conneting to Standard Bank...</span>
            </div>}
            {(code === "TF") && <div className="onfaled">
                    <span className="icon"><FontAwesomeIcon className="icon" icon={faCircleExclamation} /></span>
                    <span className="failed">Failed: {codemessage} </span>
            </div>}
            {(code === "TS") && <div className="onSuccess">
                    <span className="icon"><FontAwesomeIcon className="icon" icon={faCircleCheck} /></span>
                    <span className="failed">Payment received</span>
            </div>}
        </div>}
        <Navbar/>
        <LowerNav/>
        <div className="container">
            {carts && <>
            {(carts?.length === 0) && <div className="noitems">Cart is empty</div>}
            {!(carts?.length === 0) && <div className="inside">
                <div className="left">
                    <div className="top">
                        <span className="title">Shoping Cart</span>
                        <span className="itemsnumber">{carts.length} items</span>
                    </div>
                    <div className="bottom">
                        <div className="title">Items List</div>
                        {carts && <div className="bodyitems">
                            {
                                carts.map((cart,index)=>(
                                    <SingleCart key={index} data={cart} onDeleteItem={handleRefresh} /> 
                                ))
                            }
                        </div>}
                    </div>
                </div>
                <div className="rightt">
                    <div className="righttotal">Total</div>
                    {carts && <div className="rightfigure"><span>MWK </span>{formatNumberWithCommas(calculateTotal(carts))}</div>}
                    <div className="paymentoptions">
                        <div className="title">Payment options</div>
                        <div className="tickarea">
                            <span className="optionpay">
                                <span onClick={()=>setPayOption("airtel")} className="iconpay">
                                {selectedPay === 'airtel' ? (
                                    <FontAwesomeIcon icon={faCheckSquare} />
                                ) : (
                                    <FontAwesomeIcon icon={faSquare} />
                                )}</span>
                                <span className="wordpay">Airtel Money</span>
                            </span>
                            <span className="optionpay">
                                <span onClick={()=>setPayOption("STD")} className="iconpay">{selectedPay === 'STD' ? (
                                    <FontAwesomeIcon icon={faCheckSquare} />
                                ) : (
                                    <FontAwesomeIcon icon={faSquare} />
                                )}</span>
                                <span className="wordpay">Standard Bank</span>
                            </span>

                        </div>
                    </div>
                    <div className="paymentnow">
                        {(selectedPay && cartLoaded) && <button onClick={()=>payOrder()}>Pay Now</button>}
                        {(selectedPay && !cartLoaded) && <button >Loading cart...</button>}
                        {!selectedPay && <button>select payment method</button>}
                    </div>
                </div>
            </div>}
            </>}
        </div>
    </div>
  )
}
