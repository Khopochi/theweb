import React from 'react';
import './productview.scss'
import { Navbar } from '../../components/navbar/Navbar';
import { LowerNav } from '../../components/lowernav/LowerNav';
import { ViewProductCard } from '../../components/viewproductcard/ViewProductCard';

export const ProductView = () => {
  return (
    <div className="productview">
        <Navbar/>
        <LowerNav/>
        <div className="viewcardarea">
            <ViewProductCard/>
        </div>
    </div>
  )
}
