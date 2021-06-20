import React from "react";
import ChangeCity from "./ChangeCity";
import ChangeLang from "./ChangeLang";
import "../../assets/css/header.css";
const Header = ({ handleAddCity, onOpenExistCityAlert }) => {
  return (
    <div className="header">
      <ChangeCity handleAddCity={handleAddCity} onOpenExistCityAlert={onOpenExistCityAlert}/>
      <ChangeLang />
    </div>
  );
};
export default Header;
