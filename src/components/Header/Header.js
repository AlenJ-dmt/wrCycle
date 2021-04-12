import React, { useState, useContext } from "react";
import CustomButtom from "../CustomButton/CustomButtom";
import { useHistory } from "react-router-dom";
import "./Header.css";
import WheelApiService from "../../services/wheel-api-service";
import WheelContext from "../../context";
import { AiFillHome } from "react-icons/ai";

const Header = () => {
  const history = useHistory();
  const [wheelInvoice, setWheelInvoice] = useState(null);

  const context = useContext(WheelContext);

  const moveToNewRepair = () => {
    history.push("/create");
  };

  const findWheel = (searchedWheel) => {
    WheelApiService.searchInvoice(searchedWheel).then((wr) => {
      context.setResults(wr);
    });

    history.push("/search");
  };

  return (
    <header className="app_header">
      <div className="header__container">
        <AiFillHome size={50} onClick={() => history.push("/")} />
        <label className="search__bar__label">
          Buscar: {"  "}
          <input
          maxLength="6"
            onChange={(ev) => {
              setWheelInvoice(ev.target.value);
            }}
            className="search__bar"
          />
        </label>
        <CustomButtom
          onClickDo={() => findWheel(wheelInvoice)}
          // styles={}
          color={"#15B47E"}
          title="Buscar"
        />
        <CustomButtom
          onClickDo={() => moveToNewRepair()}
          // styles={}
          color={"#15B47E"}
          title="New Repair"
        />
      </div>
    </header>
  );
};

export default Header;
