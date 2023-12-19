import React, { useContext, useEffect, useState } from 'react';
import './home.scss'
import { Navbar } from '../../components/navbar/Navbar';
import { LowerNav } from '../../components/lowernav/LowerNav';
import { Headerslider } from '../../components/headerslider/Headerslider';
import { Trending } from '../../parts/trending/Trending';
import { TrendingProduct } from '../../components/trendingproduct/TrendingProduct';
import { HotCategory } from '../../parts/hotcategories/HotCategory';
import { SingleHotCat } from '../../components/hotcatgory/SingleHotCat';
import { Card } from '../../components/card/Card';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export const Home = () => {

  const {user} = useContext(AuthContext)
  const [products,setProducts] = useState()
  const fetchData = async () => {
    try{
      const product = await axios.get(process.env.REACT_APP_API_URL+"product/getproducts")
      setProducts(product.data)
    }catch(err){

    }
  }

  //fetch the tabs below category, sub and products (6)
  const [homeData, setHomeData] = useState()
  const fetchHome = async () => {
    try{
      const product = await axios.get(process.env.REACT_APP_API_URL+"product/home")
      setHomeData(product.data)
    }catch(err){

    }
  }

  const [shuffled, setShuffled] = useState()
  const fetchShuffle = async () => {
    try{
      const product = await axios.get(process.env.REACT_APP_API_URL+"product/getshuffle")
      setShuffled(product.data)
    }catch(err){

    }
  }
  
  useEffect(() => {
    const fetchDataAsync = fetchData();
    const fetchHomeAsync = fetchHome();
    const fetchShuffleAsync = fetchShuffle();

    // Use Promise.all to wait for all promises to resolve
    Promise.all([fetchDataAsync, fetchHomeAsync, fetchShuffleAsync]).then(() => {
      // All functions have completed
      // You can do additional actions after all data is fetched
    });
  }, []);
  console.log(shuffled)
  return (
    <div className="home">
      <div className="unmovable">
      <Navbar/>
      </div>
        <LowerNav/>
        <Headerslider/>
        <Trending/>
        <div className="trendingDiv">
          {
            products?.map((pr,i)=>(
              <TrendingProduct key={i} data={pr}/>
            ))
          }
        </div>
        <HotCategory/>
        <div className="hotCategoryDiv">
          {
            shuffled?.map((item,index)=>(
                <SingleHotCat data={item} key={index}/>
            ))
          }

        </div>
        <div className="cardsarea">
          {
            homeData?.map((item,index)=>(
                <Card key={index} data={item}/>
            ))
          }
        </div>
        <div>
          gdhywfdyuwfgdyuywfyud
        </div>
    </div>
  )
}
