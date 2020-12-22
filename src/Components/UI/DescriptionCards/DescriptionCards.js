import React from "react";
import classes from "./DescriptionCards.module.css"
import {DescriptionCard} from "../Card/DescriptionCard";

export const DescriptionCards = (props) => {

    return (
      <div className={classes.DescriptionCards}>
          {props.arr.map((item,index) => <DescriptionCard key={index} title = {item.title} text = {item.text}/> )}
      </div>
    );
}