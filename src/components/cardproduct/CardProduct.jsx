import React from 'react';
import './cardproduct.scss'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import { useNavigate } from 'react-router-dom';

export const CardProduct = ({data}) => {
    const formatNumberWithCommas = (value) => {
        return value.toLocaleString('en-US');
      };
      const calculateDiscountedPrice = (price,discount) => {
        if(!discount)
            return formatNumberWithCommas(price)
            

        const discountAmount = (price * discount) / 100;
        const discountedPrice = price - discountAmount;
    
        return formatNumberWithCommas(discountedPrice)
    };
    const navigate = useNavigate()
  return (
    <div onClick={()=>navigate("/viewproduct/"+data._id, {state: {data}})} className="cardproduct">
        <div className="instock">{data.quantity} in stock</div>
        <div className="productimage">
            <div className="imageWrapper">
                <img className='rawImage' src={process.env.REACT_APP_API_URL+"photos/"+data.photos[0]} alt="" />
            </div>
        </div>
        <div className="productDetails">
            <div className="upper">
                <div className="title">{data.deepCategoryName}</div>
                <div className="productname">{data.name}</div>
            </div>
            <div className="lower">
                <div className="addtocart">
                    <AddShoppingCartSharpIcon/>
                </div>
                <div className="price">
                    <span>MWK</span> {calculateDiscountedPrice(data.price, data.discount)}
                </div>
            </div>      
        </div>
    </div>
  )
}
