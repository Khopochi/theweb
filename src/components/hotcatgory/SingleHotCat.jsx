import React from 'react';
import './singlehotcat.scss'
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

export const SingleHotCat = ({data}) => {
    const navigate = useNavigate()
    const formatNumberWithCommas = (value) => {
        return value.toLocaleString('en-US');
      };
  return (
    <div onClick={()=>navigate("/viewproduct/"+data._id, {state: {data}})} className="singlehotcat">
        <div className="imageDiv">
            <img src={"https://api.jiabaili.shop/api/photos/"+data.photos[0]} alt="" className="catimg" />
        </div>
        <div className="detailsDiv">
            <div className="upper">
                <div className="namediv">
                    {data.name}
                </div>
                <div className="quantitydiv">
                    {data.quantity} in stock
                </div>
            </div>
            <div className="lower">
                <div className='shopmore'>MWK {formatNumberWithCommas(data.price)}</div>
            </div>
        </div>
    </div>
  )
}
