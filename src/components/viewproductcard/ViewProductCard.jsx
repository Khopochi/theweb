import React, { useContext, useEffect, useState } from 'react';
import './viewproductcard.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser';
import { AuthContext } from '../../context/AuthContext';
import { faCircleCheck, faSquare, faSquareCheck } from '@fortawesome/free-regular-svg-icons';


export const ViewProductCard = () => {
    const {user} = useContext(AuthContext)
    const {id} = useParams()
    const location = useLocation()
    const [product,setProduct] = useState(location.state?.data)
    const [currentPhoto, setCurrentPhoto] = useState(product?.photos?.[0] ?? null);

    //fetch user
    const [rUser,setRUser] = useState()
    const getUser = async() => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"user/getSingleUser/"+user._id)
            setRUser(res.data)
        }catch(err){

        }
    }

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


    const fetchProduct = async () => {
        const res = await axios.get(process.env.REACT_APP_API_URL+"product/getsingleproduct/"+id)
        if(res.data.error === "Internal Server Error"){

        }else{
            setProduct(res.data)
            setCurrentPhoto(res.data.photos[0])
        }
    }
    useEffect(()=>{
        fetchProduct()
        getTowns()
        if(user){
            getUser()
        }
    },[id])
    const onHoover = (photo) => {
        setCurrentPhoto(photo)
    }
    //value function
    const formatNumberWithCommas = (value) => {
        return value.toLocaleString('en-US');
      };

    //calculater discount
    const calculateDiscountedPrice = (price,discount) => {
        if(!discount)
            return formatNumberWithCommas(price)
            

        const discountAmount = (price * discount) / 100;
        const discountedPrice = price - discountAmount;
    
        return formatNumberWithCommas(discountedPrice)
      };
      //counter
        const [options, setOptions] = useState({
            items: 1,
        });
        const handleOption = (name, operation) => {
            setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
            });
        };

    //caculate total
    const calculateDiscountedPriceTotal = (quantity,price,discount) => {
        const nodiscount = price * quantity
        if(!discount)
            return formatNumberWithCommas(nodiscount)


        const discountAmount = (price * discount) / 100;
        const discountedPrice = price - discountAmount;
    
        return formatNumberWithCommas(discountedPrice * quantity)
      };

      //onadd to cart
      const addToCart = async () => {
        const datatoPost = {
            productid: product._id,
            quantity: options.items,
            weight: product.weight,
            location: finalTown
        }
        console.log(datatoPost)
        setadding(true)
        try{
            const res = await axios.post(process.env.REACT_APP_API_URL+"user/addtocart/"+user._id ,datatoPost)
            getUser()
            
        }catch(err){

        }
      }

      //check if item arleady in cart
      const itemInCart = (cart, productIdToCheck) => {
        if(rUser){
            return cart.some(item => item.productid === productIdToCheck);
        }
      };
      

      //pick function
      const [showLT, setLT] = useState(false)
      const [lock,setLock] = useState("pick")
      const [finalTown, setFinaltown] = useState(undefined)
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

      //handle selected location
      const [costCalculate, setCalculate] = useState(false)
      const selectLocation = (_id) => {
        const selected = towns.find((location) => location._id === _id);
        setSelectedTown(selected);
        setFinaltown(selected.location)
        setLT(false)
      };

      //weight caliculations
      const getChargeByWeight = (weight) => {
        const charge = selectedTown.charge.find(
          (charge) => weight >= charge.minweight && weight <= charge.maxweight
        );
        return charge.cost
        // return charge;
      };

      const [adding,setadding] = useState(false)



      
  return (
    <>
        {product && <div className="viewproductcard">
            <div className="history">Home - {product?.name}</div>
            <div className="maincard">
                <div className="left">
                    <div className="thumbnails">

                        {
                            product?.photos?.map((pr,index)=>(
                                <div onMouseOver={()=>onHoover(pr)} key={index} className="thumbcover">
                                    <img src={process.env.REACT_APP_API_URL+"photos/"+pr} alt="" className="thumb" />
                                </div>  
                            ))
                        }
                    </div>
                    <div className="actualimage">
                        <img src={process.env.REACT_APP_API_URL+"photos/"+currentPhoto} alt="" className="activeimage" />
                    </div>
                </div>
                <div className="middle">
                    <div className="title">
                        {product.name}
                    </div>
                    <div className="instock">{product.quantity} items in stock</div>
                    <div className="rating">
                        <div className="value">4.9</div>
                        <div className="stars">
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className="seperater">
                            |
                        </div>
                        <div className="ratersamount">
                            2,100
                        </div>
                    </div>
                    <div className="divider"></div>
                    <div className="details">
                        Details
                    </div>
                    <div className="price">
                        <div className="upper">
                            {product.discount &&  <span className="discount">
                                <span className="percent">{product.discount}%</span>
                                <span className="disco">Discount</span>
                            </span>}
                            <span className="price1">
                                <span className="mwk">
                                    MWK
                                </span>
                                <span className="actualprice">
                                    {calculateDiscountedPrice(product.price,product.discount)}
                                </span>
                            </span>
                        </div>
                        {product.discount && <div className="lower">
                            <span className="typical">
                                Typical Price: 
                            </span>
                            <span className="oldprice">
                                MWK {formatNumberWithCommas(product.price)}
                            </span>
                        </div>}
                    </div>
                    <div className="description">
                        {parse(product.details)}
                    </div>
                </div>
                <div className="right">
                    <div className="price">
                        <span className="mwk">
                            MWK
                        </span>
                        <div className="actualprice">
                            {calculateDiscountedPriceTotal(options.items,product.price,product.discount)}
                        </div>
                    </div>
                    <div className="essay">
                        Enjoy a consistent 10% discount on your purchases through JiaBaiLi Online.
                    </div>
                    <div className="instockright">
                        In Stock
                    </div>
                    <div className="quantity">
                        <span className="title">Quantity</span>
                        <div className="buttons">
                            <button className="minus" disabled={options.items <= 1} onClick={()=>handleOption("items", "d")}>-</button>
                            <span className="amount">{options.items}</span>
                            <button  disabled={options.items == product.quantity} className="plus" onClick={()=>handleOption("items", "i")}>+</button>
                        </div>
                    </div>
                    <div className="instockright shipping">
                        {showLT && <div className="townbody">
                            <div className="title">Select District</div>
                            {
                                towns.map((item,index)=>(
                                    <div onClick={()=>selectLocation(item._id)} className='district' key={index}>{item.location}</div>
                                ))
                            }
                        </div>}
                        <div className="title">Shipping</div>
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
                        </div>
                        {selectedTown && <div className="shipcost">
                            <div className="title">
                                <span className="destrict">Shipping Cost to {selectedTown.location}</span>
                                <span onClick={()=>setLT(true)} className="change">Change location</span>
                            </div>
                            MWK {formatNumberWithCommas(getChargeByWeight(product.weight)*options.items)} ({product.weight}kgs x {options.items}) will be added to your final total
                        </div>}
                    </div>
                    <div className="divider"></div>
                    <div className="addtocart">
                        { (!(itemInCart(rUser?.cart, product._id)) && !adding) && <button onClick={()=>addToCart()}>
                            Add to cart
                        </button>}
                        { (!(itemInCart(rUser?.cart, product._id)) && adding) && <button>
                            Adding...
                        </button>}
                        {(itemInCart(rUser?.cart, product._id)) && <div className="itemincart">
                            <span><FontAwesomeIcon icon={faCircleCheck} /></span> <span>Product in cart</span>
                        </div>}
                        <button className='buynow'>
                            Buy now
                        </button>
                    </div>
                    <div className="delivary">
                        <div className="left-d">
                            <span>Sold by</span>
                            <span>Delivary {"(LL)"}</span>
                            <span>Delivary by </span>
                        </div>
                        <div className="right-d">
                            <span>JiaBaiLishop.com</span>
                            <span>JiaBaiLishop.com</span>
                            <span className='speed'>Speed Courier services</span>
                        </div>
                    </div>
                    <div className="dividerr"></div>
                </div>
            </div>
        </div>}
    </>
  )
}
