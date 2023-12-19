import React from 'react';
import './category.scss'
import { Navbar } from '../../components/navbar/Navbar';
import { LowerNav } from '../../components/lowernav/LowerNav';
import { CategoryCard } from '../../components/categorycard/CategoryCard';

export const Category = () => {
  return (
    <div className="category">
        <div className="top">
            <Navbar/>
            <LowerNav/>
        </div>
        <div className="bottom">
            <CategoryCard/>
        </div>
    </div>
  )
}
