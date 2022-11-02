import axios from "axios";
import React, { useState, useEffect } from "react";

interface Category {
  id: number;
  name: string;
}

const categoriesDummy: Category[] = [
  //delete this variable once real data available
  { id: 1, name: "Shopping" },
  { id: 2, name: "Restaurant" },
  { id: 3, name: "Beauty & Spas" },
  { id: 4, name: "Nature" },
  { id: 5, name: "Cafe" },
  { id: 6, name: "Hotel" },
  { id: 7, name: "Sports" },
  { id: 8, name: "Nightlife" },
];
console.log(categoriesDummy[0].name);

export const CategoryCard: React.FC = () => {
  // useEffect(() => {
  //   axios.get("http://localhost:3000/test").then((res) => {
  //     console.log(res.data);
  //   });
  // }, []);

  return (
    <>
      {categoriesDummy.map((category) => {
        return (
          <div key={category.id}>
            <span>category icon</span>
            <p>{category.name}</p>
          </div>
        );
      })}
    </>
  );
};
