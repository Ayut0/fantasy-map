import React from "react";
import { Buttons } from "./Buttons";

export const ListCard: React.FC = () => {
  return (
    <>
      <div>
        <h3>Title</h3>
        <img src="#" alt="list image" />
        <p>Short description</p>
        <div>
          <Buttons />
        </div>
        <img src="#" alt="profile icon" />
        <span>name</span>
      </div>
    </>
  );
};
