import React, { useContext, useState } from 'react'
import './cart.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { BeatLoader } from 'react-spinners';


export const SingleCart = ({data, onDeleteItem}) => {
    const formatNumberWithCommas = (value) => {
        return value.toLocaleString('en-US');
      };
      const navigate = useNavigate()
      const nextpage = () => {
        navigate("/viewproduct/"+data._id)
      }

      const [loader,setLoader] = useState(false)
      const [deleting, setDeleting] = useState(false)
      const {user} = useContext(AuthContext)
      const onDelete = async () => {
        setDeleting(true)
        try{
            const res = await axios.put(process.env.REACT_APP_API_URL+"user/removeitem/"+user._id+"/"+data.cartid)
            onDeleteItem(data.cartid)
            setDeleting(false)
            setLoader(false)
        }catch(err){

        }
      }
  return (
    <div className="singleitem">
        {loader && <div className="loaderbb">
            {!deleting && <><div className="title">Remove Item?</div>
            <div className="buttonsarea">
                <button onClick={()=>onDelete()} className="left12">Confirm</button>
                <button onClick={()=>setLoader(false)} className="right12">Cancel</button>
            </div></>}
            {deleting && <div className="divload">
                <div className="divicon"><BeatLoader color="hsla(351, 84%, 49%, 1)" /></div>
                <div className="title">Removing...</div>
            </div>}



    </div>}
    <div className="left">
        <img src={"https://api.jiabaili.shop/api/photos/"+data.productimg} alt="" />
    </div>
    <div className="middle">
        <div onClick={()=>nextpage()} className="title">{data.productname}</div>
        <div className="detailsmore">
            <div className="detailsleft">
                <div className="priced">Item price</div>
                { !(data.ship === 0) && <div className="Shipd">Delivary fee</div>}
                <div className="total">Total</div>
            </div>
            <div className="detailsright">
                <div className="drprice"><span className="mwk">MWK</span>  {formatNumberWithCommas(data.price)}</div>
                { !(data.ship === 0) && <div className="drship"><span className="mwk">MWK</span>  {formatNumberWithCommas(data.ship)}</div>}
                <div className="drprice"><span className="mwk">MWK</span>  {formatNumberWithCommas(data.cartTotal)}</div>

            </div>
        </div>
    </div>
    <div className="right">
        <div className="topDelete"><FontAwesomeIcon onClick={()=>setLoader(true)} className='icon' icon={faTrashCan} /></div>
        <div className="changequantity">
        <div className="quantity">
            <span className="title">Quantity</span>
            <div className="buttons">
                <span className="minus"></span>
                <span className="amount">{data.quantity}</span>
                <span className="plus"></span>
            </div>
        </div>
        </div>
    </div>
</div>
  )
}
