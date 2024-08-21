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
import SearchCard from '../../components/searchcard/SearchCard';
import Banner from '../../components/banner/Banner';
import { BeatLoader } from 'react-spinners';

export const Home = () => {

  const {user} = useContext(AuthContext)
  const [loader, setloader] = useState(true)
  const [products, setProducts] = useState(() => {
    // Check if products are already in sessionStorage
    const savedProducts = sessionStorage.getItem('products');
    return savedProducts ? JSON.parse(savedProducts) : null;
  });

  const fetchData = async () => {
    setloader(true)
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + "product/getproducts");
      const productData = response.data;
      setProducts(productData);
      setloader(false)

      
      // Save the fetched data to sessionStorage
      sessionStorage.setItem('products', JSON.stringify(productData));
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  //fetch the tabs below category, sub and products (6)
  const [homeData, setHomeData] = useState(() => {
    // Check if homeData is already in sessionStorage
    const savedHomeData = sessionStorage.getItem('homeData');
    return savedHomeData ? JSON.parse(savedHomeData) : null;
  });

  const fetchHome = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API_URL + "product/home");
      const homeDataResponse = response.data;
      setHomeData(homeDataResponse);
      // Save the fetched data to sessionStorage
      sessionStorage.setItem('homeData', JSON.stringify(homeDataResponse));
    } catch (err) {
      console.error("Error fetching home data:", err);
    }
  };

  useEffect(() => {
    // If homeData isn't in sessionStorage, fetch it
    if (!homeData) {
      fetchHome();
    }
  }, [homeData]);

  const [shuffled, setShuffled] = useState()
  const fetchShuffle = async () => {
    try{
      const product = await axios.get(process.env.REACT_APP_API_URL+"product/getshuffle")
      setShuffled(product.data)
    }catch(err){

    }
  }
  
  useEffect(() => {
    // If products aren't in sessionStorage, fetch them
    if (!products) {
      fetchData();
    }
  }, [products]);


  console.log(shuffled)
  return (
    <div className="home">
      {!homeData && <div className="loader">
        <BeatLoader size={10} color='#E3242B'/>
      </div>}
      <div className="unmovable">
      <Navbar/>
      </div>
        <LowerNav/>
        <Banner/>
        <Trending/>
        <div className="trendingdivparent">
            <div className="trendingDiv">
              {
                products?.map((pr,i)=>(
                  // <TrendingProduct key={i} data={pr}/>
                  <SearchCard key={i} data={pr} />
                ))
              }
            </div>
        </div>
        <div className="cardsarea">
          {
            homeData?.map((item,index)=>(
                <Card key={index} data={item}/>
            ))
          }
        </div>
        {/* <div>
          gdhywfdyuwfgdyuywfyud
        </div> */}
    </div>
  )
}
