import React, { useEffect, useState } from 'react'
import './product.scss'
import { Navbar } from '../../components/navbar/Navbar'
import { LowerNav } from '../../components/lowernav/LowerNav'
import './product.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import SearchCard from '../../components/searchcard/SearchCard'
import { BeatLoader } from 'react-spinners'
import InfiniteScroll from 'react-infinite-scroll-component'

export const Subcategory = () => {
    const { id } = useParams();
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [ids, setIds] = useState([]);
  const [load, setLoader] = useState(true);
  const [hasmore, sethasmore] = useState(true);

  const getProducts = async () => {
    setLoader(true);
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + "product/subcategories/" + id);
      if (res.data.products.length < 12) {
        sethasmore(false);
      }
      setData(res.data);
      setProducts(res.data.products);

      let idss = [];
      res.data.products.forEach((bits) => {
        idss.push(bits._id);
      });
      setIds(idss);

      // Save data and the current id in sessionStorage
      sessionStorage.setItem('cachedSubId', id);
      sessionStorage.setItem('cachedSubData', JSON.stringify(res.data));
      sessionStorage.setItem('cachedSubProducts', JSON.stringify(res.data.products));
      sessionStorage.setItem('cachedSubIds', JSON.stringify(idss));

      setLoader(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Check if cached data exists and if it matches the current id
    const cachedSubId = sessionStorage.getItem('cachedSubId');
    const cachedSubData = sessionStorage.getItem('cachedSubData');
    const cachedSubProducts = sessionStorage.getItem('cachedSubProducts');
    const cachedSubIds = sessionStorage.getItem('cachedSubIds');

    if (cachedSubId && cachedSubId === id && cachedSubData && cachedSubProducts && cachedSubIds) {
      // Use cached data
      setData(JSON.parse(cachedSubData));
      setProducts(JSON.parse(cachedSubProducts));
      setIds(JSON.parse(cachedSubIds));
      setLoader(false);
    } else {
      // Fetch new data if the id is different or no cache exists
      getProducts();
    }
  }, [id]);

  const fetchmore = async () => {
    console.log("Reached");
    try {
      const res = await axios.get(process.env.REACT_APP_API_URL + "product/searchproductsub/" + ids.join(',') + "/" + id);
      if (res.data.length < 12) {
        sethasmore(false);
      }
      setProducts(products.concat(res.data));

      let idss = [];
      res.data.forEach((bits) => {
        idss.push(bits._id);
      });
      setIds(ids.concat(idss));

      // Update sessionStorage with the new ids and products
      sessionStorage.setItem('cachedSubProducts', JSON.stringify(products.concat(res.data)));
      sessionStorage.setItem('cachedSubIds', JSON.stringify(ids.concat(idss)));

    } catch (err) {
      console.error(err);
    }
  };


  const navigate = useNavigate()
  return (
    <div className='ProductResults'>
        {load && <div className="loader">
            <BeatLoader color="hsla(351, 84%, 49%, 1)" />
        </div>}
        <div><Navbar/></div>
        <div><LowerNav/></div>
        {data && <div className="productContainere">
            <div className="container1e">
                <div className="left">
                    <div className="heading">Item Category</div>
                    <div className="categortList">
                        {
                            data.categories.map((item,index)=>(
                            <div onClick={()=>navigate("/categories/"+item._id)} key={index} className="list">
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
                            <div onClick={()=>navigate("/allproducts/"+item._id)} key={index} className="list">
                                <div className="ICON"><FontAwesomeIcon icon={faSquare} /></div>
                                <div className="itemWord">{item.name}</div>
                            </div>
                            ))
                        }
                    </div>
                </div>
                <div className="superright">
                    <InfiniteScroll dataLength={products?.length} next={fetchmore} hasMore={hasmore} loader={<p style={{ textAlign: 'center', marginTop: '10px', color: '#E3242B' }}>
                        Loading...
                        </p>} scrollableTarget="window">
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


