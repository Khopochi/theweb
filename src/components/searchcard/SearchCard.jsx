import React, { useContext, useEffect, useState } from 'react'
import './searchcard.scss'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const SearchCard = ({data}) => {
    const [location,setLocation] = useState()
    const {user} = useContext(AuthContext)


    //fetch user
    const [rUser,setRUser] = useState()
    const getUser = async() => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"user/getSingleUser/"+user._id)
            setRUser(res.data)
        }catch(err){

        }
    }

     //get towns
    //locations
    const [towns, setTowns] = useState()
    const [selectedTown, setSelectedTown] = useState()
    const getTowns = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"shipping")
            setTowns(res.data)
        }catch(err){

        }
    }

    useEffect(()=>{
        if(user){
            getUser()
            getTowns()
        }
    },[])


   

    const [adding, setAdding] = useState(false)
    const addToCart = async () => {
        const datatoPost = {
            productid: data._id,
            quantity: 1,
            weight: data.weight,
            location: finalTown
        }
        setShowOption(false)
        setLT(false)
        setAdding(true)
        try{
            const res = await axios.post(process.env.REACT_APP_API_URL+"user/addtocart/"+user._id ,datatoPost)
            getUser()
            setAdding(false)
            cancel()
            
        }catch(err){

        }
      }

      //pick function
      const [showLT, setLT] = useState(false)
      const [lock,setLock] = useState("pick")
      const [finalTown, setFinaltown] = useState(undefined)
      const [showOption, setShowOption] = useState(false)
      const pickLocation = (id) => {
            if(id === "pick"){
                setLock("pick")
                setLT(false)
                setCalculate(false)
                setFinaltown(undefined)
                setSelectedTown(undefined)
            }else if(id === "send"){
                setLock("send")
                setLT(true)

            }
      }
      const [costCalculate, setCalculate] = useState(false)
      const selectLocation = (_id) => {
        const selected = towns.find((location) => location._id === _id);
        setSelectedTown(selected);
        setFinaltown(selected.location)
        setLT(false)
      };


      const cancel = () => {
        setFinaltown(undefined)
        setShowOption(false)
        setLT(false)
        setLock("pick")
        setCalculate(false)
        setSelectedTown(undefined)

      }

      //calculate cost weight
      const formatNumberWithCommas = (value) => {
        return value.toLocaleString('en-US');
      };
      const getChargeByWeight = (weight) => {
        const charge = selectedTown.charge.find(
          (charge) => weight >= charge.minweight && weight <= charge.maxweight
        );
        return charge.cost
        // return charge;
      };


      //check if product already in cart
      const dataInCart = (cart, productIdToCheck) => {
        if(rUser){
            return cart.some(data => data.productid === productIdToCheck);
        }
      };

      //calculate discounted price
      //calculater discount
        const calculateDiscountedPrice = (price,discount) => {
            if(!discount)
                return formatNumberWithCommas(price)
                

            const discountAmount = (price * discount) / 100;
            const discountedPrice = price - discountAmount;
        
            return formatNumberWithCommas(discountedPrice)
        };
        const navigate = useNavigate()


        //decision to 
        const Decide = () => {
            if(user){
                setShowOption(true)
            }else{
                navigate("/login/")
            }
        }
  return (
    <div className='searchproductt'>
      <div className="img">
      {showLT && <div className="locationn">
        <div className="somediv">
        <div className="title">Select District</div>
                            {
                                towns?.map((data,index)=>(
                                    <div onClick={()=>selectLocation(data._id)} className='district' key={index}>{data.location}</div>
                                ))
                            }
        <button onClick={()=>cancel()}>Close</button>
        </div>
        
        </div>}
        {showOption && <div className="locationnn">
        <div className="items">
                            <span>
                                <span onClick={()=>pickLocation("pick")} className="icon">{lock === 'pick' ? (
                                    <FontAwesomeIcon icon={faSquareCheck} />
                                ) : (
                                    <FontAwesomeIcon icon={faSquare} />
                                )}</span>
                                <span className="word">Pick at shop</span>
                            </span>
                            <span>
                                <span onClick={()=>pickLocation("send")} className="icon">{lock === 'send' ? (
                                    <FontAwesomeIcon icon={faSquareCheck} />
                                ) : (
                                    <FontAwesomeIcon icon={faSquare} />
                                )}</span>
                                <span className="word">Deliver to your district</span>
                            </span>
                            {selectedTown && <div className="shipcost">
                            <div className="title">
                                <span className="destrict">Shipping Cost to {selectedTown.location}</span>
                            </div>
                            MWK {formatNumberWithCommas(getChargeByWeight(data.weight))} ({data.weight}kgs) will be added to your final total
                        </div>}
                            <button onClick={()=>addToCart()}>Add to Cart</button>
                            <button onClick={()=>cancel()}>Cancel</button>
                        </div>
        </div>}
        <div onClick={()=>navigate("/viewproduct/"+data._id, {state: {data}})} className="addcart">
            {!adding && <AddShoppingCartIcon />}
            {adding && <ClipLoader color="#36d7b7" />}
        </div>
        <img onClick={()=>navigate("/viewproduct/"+data._id, {state: {data}})} src={"https://api.jiabaili.shop/api/photos/"+data.photos[0]} alt="" />
      </div>
      <div onClick={()=>navigate("/viewproduct/"+data._id, {state: {data}})} className="details">
        <div className="name">{data.name}</div>
        <div className="quantity">{data.quantity} in stock</div>
        {(dataInCart(rUser?.cart, data._id)) &&<div className="incart">Product in Cart</div>}
        <div className="price">
            <span className="mwk">MWK</span>
            <span className="figure">{calculateDiscountedPrice(data.price,data.discount)}</span>
        </div>
        <div className="discount">
            <div className="disc">{data.discount}% discount</div>
            <div className="typicalprice">MWK {formatNumberWithCommas(data.price)}</div>
        </div>
      </div>
    </div>
  )
}

export default SearchCard
