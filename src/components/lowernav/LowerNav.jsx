import React, { useEffect, useState } from 'react';
import './lowernav.scss'
import ListSharpIcon from '@mui/icons-material/ListSharp';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight, faKitchenSet } from '@fortawesome/free-solid-svg-icons';
import WatchOutlinedIcon from '@mui/icons-material/WatchOutlined';
import CountertopsOutlinedIcon from '@mui/icons-material/CountertopsOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const LowerNav = () => {

  const [Cat,setCat] = useState()
  const [subcat, setSubCategories] = useState()
  const [deepcat, setDeepCategories] = useState()
  const getCategories = async () => {
    try{
      const categories = await axios.get(process.env.REACT_APP_API_URL+"category")
      setCat(categories.data)
      const subcategories = await axios.get(process.env.REACT_APP_API_URL+"subcategory/home")
      setSubCategories(subcategories.data)
      const deepcategories = await axios.get(process.env.REACT_APP_API_URL+"deepcategory/home")
      setDeepCategories(deepcategories.data)
    }catch(err){

    }
  }
  useEffect(()=>{
    getCategories()
  },[])


  const [showsuper,setsuper] = useState(false)
  const [showright,setright] = useState(false)
  const [selected,setSelected] = useState()
  const onHoover = (id) => {
    const filteredArray = subcat?.filter(item => item.categoryyid === id);
    setSelected(filteredArray)
    setright(true)
  }

  //NAVIGATE TO CATEGORIES
  const navigate = useNavigate()
  const tocategories = (idd) => {
    setright(false)
    setsuper(false)
    navigate("/categories/"+idd)
  }

  return (
    <div className="lowernav">

      {showsuper && <div className="super">
          <div className="listcat">

              {
                Cat?.map((item,index)=>(
                  <div  onMouseOver={()=>onHoover(item._id)} key={index} className="itemlistcat">
                    <div className="left">
                      <span className='icon'><CountertopsOutlinedIcon /></span>
                      <span onMouseOut={()=>setright(false)} onMouseOver={()=>onHoover(item._id)} className='name'>{item.name}</span>
                    </div>
                    <div className="right"><FontAwesomeIcon icon={faAnglesRight} /></div>
              </div>
                ))
              }          
          </div>
          {showright && <div className="superright">

          {
            selected?.map((item, index) => (
              <div key={index} className="singleSub">
                <div className="title">
                  {item.name}
                </div>
                <div className="subsubcat">
                  {deepcat?.map((deep, i) => (
                    (deep.subcategoryid === item._id) && <div onClick={()=>tocategories(deep._id)} key={i} className="item">{deep.name}</div>
                  ))}
                </div>
              </div>
            ))
          }
          </div>}
      </div>}




        <div onClick={()=>setsuper(!showsuper)} className="category">
                <ListSharpIcon/>
                <div className="titleCat">Categories</div>           
                <KeyboardArrowDownSharpIcon/>       
        </div>
        <div className="itemLine"> | </div>
        <div className="item">Women Cloths</div>
        <div className="item">Furniture</div>
        <div className="item">Men Shoes</div>
        <div className="item">Home Appliances</div>
        <div className="item"></div>
    </div>
  )
}
