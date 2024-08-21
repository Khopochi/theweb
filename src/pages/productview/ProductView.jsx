import React, { useState } from 'react';
import './productview.scss'
import { Navbar } from '../../components/navbar/Navbar';
import { LowerNav } from '../../components/lowernav/LowerNav';
import { ViewProductCard } from '../../components/viewproductcard/ViewProductCard';

export const ProductView = () => {
  const [triggerChildFunction, setTriggerChildFunction] = useState(false);
  const handleChildEvent = () => {
      setTriggerChildFunction(prev => !prev); // Toggle to trigger the effect
  };
  return (
    <div className="productview">
        <Navbar trigger={triggerChildFunction} />
        <LowerNav/>
        <div className="viewcardarea">
            <ViewProductCard onTriggerEvent={handleChildEvent}/>
        </div>
    </div>
  )
}
