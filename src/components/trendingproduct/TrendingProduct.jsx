import React from 'react';
import './trendingproduct.scss'
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

export const TrendingProduct = ({data}) => {
    const formatNumberWithCommas = (value) => {
        return value.toLocaleString('en-US');
      };
      const navigate = useNavigate()
      const viewProduct = () => {
        navigate("/viewproduct/"+data._id, {state: {data}})
      }
  return (
    <div onClick={()=>viewProduct()} className="TrendingProduct">
        <div className="instock">{formatNumberWithCommas(data.quantity)} in Stock</div>
        <div className="productimage">
            <div className="imageWrapper">
                <img className='rawImage' src={"https://api.jiabaili.shop/api/photos/"+data.photos[0]} alt="" />
                {/* <img className='rawImage' src={process.env.REACT_APP_API_URL+"photos/"+data.photos[0]} alt="" /> */}
            </div>
        </div>
        <div className="productDetails">
            <div className="upper">
                <div className="title">Home appliances</div>
                <div className="productname">{data.name}</div>
            </div>
            <div className="lower">
                <div className="addtocart">
                    Add to cart
                </div>
                <div className="price">
                    <span>MWK </span>{formatNumberWithCommas(data.price)}
                </div>
            </div>
            <div className="last">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
            </div>
            
        </div>
    </div>
  )
}
