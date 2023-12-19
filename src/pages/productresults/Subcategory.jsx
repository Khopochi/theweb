import React, { useEffect, useState } from 'react'
import './product.scss'
import { Navbar } from '../../components/navbar/Navbar'
import { LowerNav } from '../../components/lowernav/LowerNav'
import './product.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import SearchCard from '../../components/searchcard/SearchCard'
import { BeatLoader } from 'react-spinners'
import InfiniteScroll from 'react-infinite-scroll-component'

export const Subcategory = () => {
    const {id} = useParams()
    const [data,setData] = useState()
    const [products, setProducts] = useState()
    const [ids, setIds] = useState()
    const getProducts = async () => {
        setLoader(true)
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"product/subcategories/"+id)
            setData(res.data)
            setProducts(res.data.products)
            let idss = []
              res.data.products.forEach((bits) => {
                idss.push(bits._id);
              });
            setIds(idss)
            setLoader(false)
        }catch(err){

        }
    }
    useEffect(()=>{
        if(id.length >= 1){
            getProducts()
        }
    },[id])
    const [load,setLoader] = useState(true)

    //fetch again
    const [hasmore, sethasmore] = useState(true)
    const fetchmore = async () => {
        console.log("Reached")
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"product/searchproductsub/"+ids+"/"+id)
            setProducts(products.concat(res.data))
            console.log(res.data)
            let idss = []
            res.data.forEach((bits) => {
              idss.push(bits._id);
            });
            setIds(ids.concat(idss))
            

          }catch(err){

          }
    }
  return (
    <div className='ProductResults'>
        {load && <div className="loader">
            <BeatLoader color="hsla(351, 84%, 49%, 1)" />
        </div>}
        <div><Navbar/></div>
        <div><LowerNav/></div>
        {data && <div className="productContainer">
            <div className="container1">
                <div className="left">
                    <div className="heading">Item Category</div>
                    <div className="categortList">
                        {
                            data.categories.map((item,index)=>(
                            <div key={index} className="list">
                                <div className="ICON"><FontAwesomeIcon icon={faSquare} /></div>
                                <div className="itemWord">{item.name}</div>
                            </div>
                            ))
                        }
                    </div>

                    <div className="divider"></div>
                    <div className="heading">Sub category</div>
                    <div className="categortList">
                    {
                            data.subcategories.map((item,index)=>(
                            <div key={index} className="list">
                                <div className="ICON"><FontAwesomeIcon icon={faSquare} /></div>
                                <div className="itemWord">{item.name}</div>
                            </div>
                            ))
                        }
                    </div>
                    <div className="divider"></div>
                    <div className="heading">Deep categories</div>
                    <div className="categortList">
                    {
                            data.deepcategories.map((item,index)=>(
                            <div key={index} className="list">
                                <div className="ICON"><FontAwesomeIcon icon={faSquare} /></div>
                                <div className="itemWord">{item.name}</div>
                            </div>
                            ))
                        }
                    </div>
                </div>
                <div className="superright">
                    <InfiniteScroll dataLength={products?.length} next={fetchmore} hasMore={hasmore} scrollableTarget="window">
                        <div  id="products" className="right">
                                {
                                    products.map((item,index)=>(
                                        <SearchCard data={item} key={index} />
                                    ))
                                }
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </div>}
    </div>
  )
}


