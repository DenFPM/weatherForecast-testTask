import React, { useEffect, useState } from "react";
import i18next from "i18next";
import { useTranslation } from 'react-i18next';

const ChangeLang = () => {
  const [isDropdownLangActive, setIsDropdownLangActive] = useState(false);
  const { i18n } = useTranslation();
  return (
    <div className="dropdown">
      <button
        className="dropbtn"
        onClick={(e) => setIsDropdownLangActive(!isDropdownLangActive)}
      >
        {i18n.language}
        <i
  className={`fa fa-angle-down ${
    isDropdownLangActive
      ? "dropdown-icon-active"
      : "dropdown-icon-deactive"
  }`}
  id="dropbtn-icon"
  >{'<'}</i>
      </button>
      <div
        className={`dropdown-content${
          isDropdownLangActive ? " dropdown-content-active" : ""
        }`}
        id="ddown-content"
      >
        <button onClick={() => i18next.changeLanguage("ru")} className="loc loc-RU">
          RU
        </button>
        <button onClick={() => i18next.changeLanguage("en")} className="loc loc-EN">
          EN
        </button>
        <button onClick={() => i18next.changeLanguage("ua")} className="loc loc-UA">
          UA
        </button>
      </div>
    </div>
  );
};
export default ChangeLang;
