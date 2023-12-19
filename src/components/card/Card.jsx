import React from 'react';
import './card.scss'
import { CardProduct } from '../cardproduct/CardProduct';
import { useNavigate } from 'react-router-dom';

export const Card = ({data}) => {
    const coverimage = {
        backgroundImage: `url(https://amazcart.ischooll.com/public/uploads/images/21-02-2023/63f48b22a58d8.jpeg)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '80vh',
        width: '50%'
    }
    const navigate = useNavigate()
  return (
    <div className="card">
        <div className="left">
            <div className="detailsarea">
                <div onClick={()=>navigate("/category/"+data.category._id+"/")} className="title">
                        {data.category.name}
                </div>
                <div className="subarea">
                    {
                        data.subcategories.map((item,index)=>(
                            <div onClick={()=>navigate("/subcategories/"+item._id+"/")} key={index} className="subcategory">{item.name}</div>
                        ))
                    }
                </div>
            </div>
            <div style={coverimage}>

            </div>
        </div>
        <div className="right">
            {
                data.products.map((item,index)=>(
                    <CardProduct key={index} data={item} />
                ))
            }
        </div>
    </div>
  )
}
