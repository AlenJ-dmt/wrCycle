import React, { useState, useContext, useEffect } from "react";
import "./WheelItem.css";
import CustomButton from "../CustomButton/CustomButtom";
import { useHistory } from "react-router-dom";
import WheelsApiService from "../../services/wheel-api-service";
import contexts from "../../context";

const WheelItem = () => {
  const context = useContext(contexts);
  const [today, setToday] = useState("");

  useEffect(() => {
    let currentDate = new Date();

    setToday(
      `${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}/${currentDate.getFullYear()}`
    );
  }, []);

  const [state, setState] = useState({
    invoiceNum: "",
    vendedor: "",
    status: "",
    quantity: "",
    description: "",
    phone: "",
    eta: "",
  });

  const history = useHistory();

  const inputChangeHandler = (ev) => {
    ev.preventDefault();
    setState({ ...state, [ev.target.name]: ev.target.value });
  };

  const initRepair = () => {
    let newRepair = {
      invoice: state.invoiceNum,
      salesperson: state.vendedor,
      created: today,
      quantity: state.quantity,
      descriptions: state.description,
      phone: `+1${state.phone}`,
      eta: state.eta,
      isready: false,
      completedby: "",
      completedbyweek: "",
      home: false,
      machine: false,
      polished: false,
      multipiece: false,
    };

    WheelsApiService.initRepair(newRepair).then((res) => history.push("/"));
  };

  return (
    <div className="wheel__item__container">
      <form className="wheel__component__container">
        <div className="input__container">
          <label className="wheel__labels">Invoice #: </label>
          <input
            type="number"
            name="invoiceNum"
            className="wheel__input"
            onChange={(ev) => inputChangeHandler(ev)}
          />
        </div>
        <div className="input__container">
          <label className="wheel__labels">Phone #: </label>
          <input
            type="number"
            name="phone"
            className="wheel__input"
            onChange={(ev) => inputChangeHandler(ev)}
          />
        </div>
        {/* <div className="input__container">
          <label className="wheel__labels">ETA : </label>
          <input
            name="eta"
            className="wheel__input"
            onChange={(ev) => inputChangeHandler(ev)}
          />
        </div> */}
        <div className="input__container">
          <label className="wheel__labels">Vendedor:</label>
          <input
            name="vendedor"
            onChange={(ev) => inputChangeHandler(ev)}
            className="wheel__input"
            value={state.vendedor}
          />
        </div>
        <div className="input__container">
          <label className="wheel__labels">Qty</label>
          <input
            type="number"
            name="quantity"
            onChange={(ev) => inputChangeHandler(ev)}
            className="wheel__input"
            value={state.quantity}
          />
        </div>
        <div className="input__container">
          <label className="wheel__labels">Description: </label>
          <input
            name="description"
            onChange={(ev) => inputChangeHandler(ev)}
            className="wheel__input"
            value={state.description}
          />
        </div>
      </form>
      <CustomButton
        color="#33C98D"
        onClickDo={() => initRepair()}
        title="create"
      />
    </div>
  );
};

export default WheelItem;
