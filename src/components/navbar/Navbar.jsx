import React, { useContext, useEffect, useState } from 'react';
import './navbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { faUser } from '@fortawesome/free-regular-svg-icons';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../image/Jia Bai Li World-3.png'
import { ClipLoader } from 'react-spinners';

export const Navbar = ({ trigger }) => {
    //navigation
    const {user} = useContext(AuthContext)
    const [searchWord, setSearchWord] = useState()
    const navigate = useNavigate()
    const [count,setCount] = useState(0)
    const [countload, setCountLoad] = useState(true)
    const getCount = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"user/countitems/"+user._id)
            setCount(res.data.numberOfItemsInCart)
            setCountLoad(false)
        }catch(err){

        }
    }
    useEffect(()=>{
        getCount()
    },[trigger])


    //
    const handleInputChange = (e) => {
        setSearchWord(e.target.value);
      };
    
    //const move to the other page
    const NavigateTo = () => {
        if(credentials.searchTerm){
            navigate("/search/"+credentials.searchTerm)
            setClick(false)


        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          NavigateTo();
        }
      };

    //search item
    const [credentials,setCredentials] = useState({
        searchTerm: ""
    })
    const [searchItems,setSearchItem] = useState()
    const getSearchItem = async () => {
        try{
            const res = await axios.get(process.env.REACT_APP_API_URL+"product/search/"+credentials.searchTerm)
            setSearchItem(res.data)
            setClick(true)
            console.log(res.data)
        }catch(err){

        }
    }
    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
    }
    useEffect(()=>{
        if (credentials.searchTerm != " ") {
            const delayTimer = setTimeout(() => {
              getSearchItem();
            }, 500); // Adjust the delay based on your needs (e.g., 500 milliseconds)
      
            return () => clearTimeout(delayTimer);
          }
    },[credentials.searchTerm])

    //handl click cart
    const processCartClick = () => {
        if(user){
            navigate("/viewcart/")
        }else{
            navigate("/login/")
        }
    }
    const [click,setClick] = useState(false)
    const HandleAction = (word,key) => {
        setClick(false)
        if(word === "DeepCategory"){
            setClick(false)
            navigate("/categories/"+key+"/")
        }else if(word === "Product"){
            navigate("/viewproduct/"+key+"/")
        }else if(word === "Subcategory"){
            navigate("/subcategories/"+key+"/")
        }else if(word === "Category"){
            navigate("/category/"+key+"/")
        }
    }
  return (
    <div className="navbar">
        <div className="upperDiv">
            <div className="logoDiv">
                <img onClick={()=>navigate("/")} src={logo} alt="" />
                    {/* JiaBaiLi supermarket */}
            </div>
            <div className="searchDiv">
                {click && <div className="searchlist">
                    <div  className="closelistsearch">
                        <div className="searchsuggest">Search Suggestions</div>
                        <div onClick={()=>setClick(false)} className="closemark"><FontAwesomeIcon icon={faXmark} /></div>
                    </div>
                    { searchItems?.map((item,index)=>(
                        <div key={index} className="singleterm">
                            <div onClick={()=>HandleAction(item.key,item._id)} className="word">{item.term}</div>
                            <div className="type">{item.key}</div>
                        </div>
                    ))}
                </div>}
                <input id='searchTerm' onKeyDown={handleKeyDown} onChange={handleChange} type="text" placeholder='Search your item...' className="search" />
                <div className="searchIcon">
                    <FontAwesomeIcon onClick={()=>NavigateTo()} icon={faMagnifyingGlass} />
                </div>
            </div>
            <div className="toolsDiv">
                <div className="country">
                    <div className="flag">
                        <span className="fi fi-mw"></span>
                    </div>
                    <div className="currency">
                        <div className="malawi">
                            Malawi,
                        </div>
                        <div className="mwk">
                            MWK
                        </div>
                    </div>
                </div>
                <div className="register">
                    <div className="icon">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    {!user && <div className="words">
                        <div className="welcome">
                                Welcome,
                        </div>
                        <div className="signin">
                                 <span onClick={()=>navigate("/login/")} className="text1">Sign in</span> or <span onClick={()=>navigate("/register/")} className="text2">Register</span> 
                        </div>
                    </div>}
                    {user && <div className="words">
                        <div onClick={()=>navigate("/user/info/")} className="welcome user">
                                {user.firstname},
                        </div>
                        <div className="signin">
                                 <span onClick={()=>navigate("/myorders/")} className="text1">My Orders</span> 
                        </div>
                    </div>}
                </div>
                <div onClick={()=>processCartClick()} className="cart22">
                    <div className="aCart">
                        <ShoppingCartOutlinedIcon/>
                    </div>
                    <div className="words">
                        {countload && <div className="count"><ClipLoader color='white' size={10} /></div>}
                       {!countload && <div className="count">{count}</div>}
                        <div className="cartWord">Cart</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
