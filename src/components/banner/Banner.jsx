import React, { useEffect, useState } from 'react'
import './banner.scss'
import { useNavigate } from 'react-router-dom';



const Banner = () => {
    //slider
    const [currentSlide, setCurrentSlide] = useState(1);
    const navigate = useNavigate()
    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentSlide((prevSlide) => (prevSlide % 3) + 1); // Loop through slides
        }, 4000); // Change slide every 3 seconds
    
        return () => clearInterval(interval); // Clear interval on component unmount
      }, []);

  return (
    <div className="BannersMaster">
    <div className="banners">
      <div className="thecitizens">
          <div className="east">
            <div className={"courasel"}>
                    <img src="/img/15.jpg" alt="img 1" className={`${"slide"} ${currentSlide === 1 ? "active" : ''}`} />
                    <img src="/img/1.jpg" alt="img 2" className={`${"slide"} ${currentSlide === 2 ? "active" : ''}`} />
                    <img src="/img/3.jpg" alt="img 3" className={`${"slide"} ${currentSlide === 3 ? "active" : ''}`} />
                </div>
          </div>
          <div className="west">
            <div className="top">
                <img src='img/4.png' />
            </div>
            <div className="bottom">
                 <img src='img/14.png' />
            </div>
          </div>
      </div>
      <div className="thelowers">
            <div className='thelowertop'>
                <span className='icon'></span>
                <span className='word'>Discover Your Perfect Category</span>
            </div>
            <div  className='thelowerBottom'>
                            <div onClick={()=>navigate("/categories/657952bb37e8cd6092d11d12")} className={"shopdeeitem"}>
                                <div className={"shopdicon"}> 
                                    <img src="/img/5988246.png" width={300}  height={200}  />
                                </div>
                                <div className={"shopdeeword"}>Appliances </div>
                            </div>
                    <div onClick={()=>navigate("/categories/6579521f37e8cd6092d11cf2")} className={"shopdeeitem"}>
                        <div className={"shopdicon"}> 
                            <img src="/img/kitchen.png" width={300}  height={200}  />
                        </div>
                        <div className={"shopdeeword"}>Kitchen</div>
                    </div>
                    <div onClick={()=>navigate("/categories/657951f837e8cd6092d11cee")} className={"shopdeeitem"}>
                        <div className={"shopdicon"}> 
                            <img src="/img/crane.png" width={300}  height={200}  />
                        </div>
                        <div className={"shopdeeword"}>Tools</div>
                    </div>

                    <div onClick={()=>navigate("/categories/657951ec37e8cd6092d11cde")} className={"shopdeeitem"}>
                        <div className={"shopdicon"}> 
                            <img src="/img/electronics.png" width={300}  height={200}  />
                        </div>
                        <div className={"shopdeeword"}>Electronics</div>
                    </div>
                    <div onClick={()=>navigate("/categories/6579522f37e8cd6092d11cfa")} className={"shopdeeitem"}>
                        <div className={"shopdicon"}> 
                            <img src="/img/rc-car.png" width={300}  height={200}  />
                        </div>
                        <div className={"shopdeeword"}>Toys</div>
                    </div>
                    <div onClick={()=>navigate("/categories/6579523937e8cd6092d11cfe")} className={"shopdeeitem"}>
                        <div className={"shopdicon"}> 
                            <img src="/img/brand.png" width={300}  height={200}  />
                        </div>
                        <div className={"shopdeeword"}>Fashion</div>
                    </div>
                    <div onClick={()=>navigate("/categories/657951e437e8cd6092d11cdb")} className={"shopdeeitem"}>
                        <div className={"shopdicon"}> 
                            <img src="/img/pipes.png" width={300}  height={200}  />
                        </div>
                        <div className={"shopdeeword"}>Hardware</div>
                    </div>
                    <div  onClick={()=>navigate("/categories/6579522637e8cd6092d11cf6")} className={"shopdeeitem"}>
                        <div className={"shopdicon"}> 
                            <img src="/img/stationary (2).png" width={300}  height={200}  />
                        </div>
                        <div className={"shopdeeword"}>Stationary</div>
                    </div>

                    <div onClick={()=>navigate("/categories/6579524d37e8cd6092d11d02")}  className={"shopdeeitem"}>
                        <div className={"shopdicon"}> 
                            <img src="/img/car.png" width={300}  height={200}  />
                        </div>
                        <div className={"shopdeeword"}>Automobile</div>
                    </div>
 
                    <div onClick={()=>navigate("/categories/657952f037e8cd6092d11d16")}  className={"shopdeeitem"}>
                        <div className={"shopdicon"}> 
                            <img src="/img/construction.png" width={300}  height={200}  />
                        </div>
                        <div className={"shopdeeword"}>Construction</div>
                    </div>
            </div>       
      </div>
    </div>
</div>
  )
}

export default Banner
