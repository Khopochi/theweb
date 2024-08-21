import React, { useEffect, useState } from 'react';
import './categorycard.scss'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faSquare } from '@fortawesome/free-regular-svg-icons';
import { TrendingProduct } from '../trendingproduct/TrendingProduct';
import { useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

export const CategoryCard = () => {
    // const inputBody = {
    //         "reference": "Testing transaction",
    //         "subscriber": {
    //         "country": "UG",
    //         "currency": "UGX",
    //         "msisdn": 999989584
    //         },
    //         "transaction": {
    //         "amount": 1000,
    //         "country": "UG",
    //         "currency": "UGX",
    //         "id": "random-unique-id"
    //         }
    //     }

    //     const headers = {
    //         'Content-Type':'application/json',
    //         'Accept':'*/*',
    //         'X-Country':'UG',
    //         'X-Currency':'UGX',
    //         'Authorization': 'Bearer  UCLcp1oeq44KPXr8X*******xCzki2w'
    //       };

    //     useEffect(()=>{
    //         const AirtelAPI = async () => {
    //             const res = await axios.post("https://openapiuat.airtel.africa/airtelapi/merchant/v1/payments/", inputBody, {headers})
    //             console.log(res)
    //         }
    //         AirtelAPI()
    //     },[])
    const coverimage = {
        backgroundImage: `url(https://amazcart.ischooll.com/public/uploads/images/21-02-2023/63f48b22a58d8.jpeg)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    }
    //fetch not just anything but fetch
    const [load, setLoad] = useState(true);
  const { id } = useParams();
  const [catData, setCatData] = useState(null);
  const [products, setProducts] = useState([]);

  const getDeepDetails = async () => {
    try {
      const getDeepcat = await axios.get(process.env.REACT_APP_API_URL + "deepcategory/page/" + id);
      setCatData(getDeepcat.data);

      const getproducts = await axios.get(process.env.REACT_APP_API_URL + "product/getbydeeepid/" + id);
      setProducts(getproducts.data);

      // Save data and the current id in sessionStorage
      sessionStorage.setItem('cachedDeepCatId', id);
      sessionStorage.setItem('cachedDeepCatData', JSON.stringify(getDeepcat.data));
      sessionStorage.setItem('cachedDeepProducts', JSON.stringify(getproducts.data));

      setLoad(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Check if cached data exists and if it matches the current id
    const cachedDeepCatId = sessionStorage.getItem('cachedDeepCatId');
    const cachedDeepCatData = sessionStorage.getItem('cachedDeepCatData');
    const cachedDeepProducts = sessionStorage.getItem('cachedDeepProducts');

    if (cachedDeepCatId && cachedDeepCatId === id && cachedDeepCatData && cachedDeepProducts) {
      // Use cached data
      setCatData(JSON.parse(cachedDeepCatData));
      setProducts(JSON.parse(cachedDeepProducts));
      setLoad(false);
    } else {
      // Fetch new data if the id is different or no cache exists
      setLoad(true);
      getDeepDetails();
    }
  }, [id]);
    //loader


  return (
    <div className="categorycard">
        {load && <div className="loader">
            <BeatLoader color="hsla(351, 84%, 49%, 1)" />
        </div>}
        <div className="left">
                <div className="sections">
                        <div className="title">{catData?.subcategoryName}</div>
                        <div className="listitems">
                            {
                                catData?.deepcategoriesArray?.map((deep,index)=>(
                                    <div key={index} className="list">
                                        <div className="icon">
                                           { (catData.singleDeepcategory._id === deep._id) && <FontAwesomeIcon icon={faCircleCheck} />}
                                           { !(catData.singleDeepcategory._id === deep._id) && <FontAwesomeIcon icon={faCircle} />}
                                        </div>
                                        <div className="catName">
                                            {deep.name}
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                </div>
                {catData && <div className="divider"></div>}
                {(catData?.singleDeepcategory.brand[0].length > 0 ) && <div className="sections">
                        <div className="title">Brands</div>
                        <div className="listitems">
                            {
                                catData?.singleDeepcategory.brand.map((bran,index)=>(
                                    <div key={index} className="list">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faSquare} />
                                        </div>
                                        <div className="catName">
                                            {bran}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                </div>}
                {(catData?.singleDeepcategory.brand[0].length > 0 ) && <div className="divider"></div>}
                {(catData?.singleDeepcategory.material[0].length > 0 ) && <div className="sections">
                        <div className="title">Material</div>
                        <div className="listitems">
                            {
                                catData?.singleDeepcategory.material.map((bran,index)=>(
                                    <div key={index} className="list">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faSquare} />
                                        </div>
                                        <div className="catName">
                                            {bran}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                </div>}
                {(catData?.singleDeepcategory.material[0].length > 0 ) && <div className="divider"></div>}
                {(catData) && <div className="sections">
                    <div className="title">Price range</div>
                    <div className="sectioninput">
                        <input type="text" placeholder='MWK'/>
                        <input type="text" placeholder='MWK' />
                        <span className="button">Ok</span>
                    </div>
                </div>}
                {(catData) && <div className="divider"></div>}
                
                {(catData?.singleDeepcategory.appearance[0].length > 0 ) && <div className="sections">
                        <div className="title">Appearance</div>
                        <div className="listitems">
                            {
                                catData?.singleDeepcategory.appearance.map((bran,index)=>(
                                    <div key={index} className="list">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faSquare} />
                                        </div>
                                        <div className="catName">
                                            {bran}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                </div>}
                {(catData?.singleDeepcategory.appearance[0].length > 0 ) && <div className="divider"></div>}

                {(catData?.singleDeepcategory.type[0].length > 0 ) && <div className="sections">
                        <div className="title">Type</div>
                        <div className="listitems">
                            {
                                catData?.singleDeepcategory.type.map((bran,index)=>(
                                    <div key={index} className="list">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faSquare} />
                                        </div>
                                        <div className="catName">
                                            {bran}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                </div>}
                {(catData?.singleDeepcategory.type[0].length > 0 ) && <div className="divider"></div>}
        </div>
        <div className="middle">
                {products && <>
                    {
                        products.map((product,index)=>(
                            <TrendingProduct data={product} deep={"selected"} key={index}/>
                        ))
                    }
                </>}
        </div>
        <div className="right" style={coverimage}>

        </div>
    </div>
  )
}
