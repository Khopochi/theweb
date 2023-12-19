import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './userinfo.scss'
import { Navbar } from '../../components/navbar/Navbar'
import { LowerNav } from '../../components/lowernav/LowerNav'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserInfo = () => {
  const {user} = useContext(AuthContext)
  const [myUser, setMyUser] = useState()
  const getUser = async () => {
    try{
      const res = await axios.get(process.env.REACT_APP_API_URL+"user/getSingleUser/"+user._id)
      setMyUser(res.data)
    }catch(err){

    }
  }

  useEffect(()=>{
    if(user){
      getUser()
    }
  },[])
  console.log(myUser)
  return (
    <div className='userinfo'>
      <Navbar/>
      <LowerNav/>
      <div className="supercontainerinfo">
          <div className="conatinerinfo">
            <div className="leftinfo">
              <div className="img">
              <FontAwesomeIcon icon={faUser} />
              </div>
            </div>
            <div className="rightinfo">
              <div className="details">
                  <div className="name">
                    <div className="title">First Name</div>
                    <div className="word">{myUser?.firstname}</div>
                  </div>
                  <div className="name">
                    <div className="title">Last Name</div>
                    <div className="word">{myUser?.lastname}</div>
                  </div>
                  <div className="name">
                    <div className="title">Phone number</div>
                    <div className="word">{myUser?.phonenumber}</div>
                  </div>
              </div>
              <div className="edit">
                

              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default UserInfo
