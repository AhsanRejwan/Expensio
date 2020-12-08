import React from "react";
import "./DescriptionCards.css"
import {DescriptionCard} from "../Card/DescriptionCard";

export const DescriptionCards = (props) => {

    return (
      <div className="DescriptionCards">
          {props.arr.map(item => <DescriptionCard title = {item.title} text = {item.text}/> )}
      </div>
    );
}