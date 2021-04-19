import React, { useState, useEffect } from "react";
import "./WheelItem.css";
import CustomButton from "../CustomButton/CustomButtom";
import { useHistory } from "react-router-dom";
import WheelsApiService from "../../services/wheel-api-service";

const WheelItem = () => {
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

  const setVendedor = (person) => {
    let phoneNumber = "";

    person === "Sabino"
      ? (phoneNumber = "8327901665")
      : (phoneNumber = "7138207229");

    setState({ ...state, vendedor: person, phone: phoneNumber });
  };

  const setQty = (qty) => {
    setState({ ...state, quantity: qty });
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
            maxLength="6"
            className="wheel__input"
            onChange={(ev) => inputChangeHandler(ev)}
          />
        </div>
        {/* <div className="input__container">
          <label className="wheel__labels">Phone #: </label>
          <input
            type="number"
            name="phone"
            className="wheel__input"
            onChange={(ev) => inputChangeHandler(ev)}
          />
        </div> */}
        {/* <div className="input__container">
          <label className="wheel__labels">ETA : </label>
          <input
            name="eta"
            className="wheel__input"
            onChange={(ev) => inputChangeHandler(ev)}
          />
        </div> */}
        <div className="input__container">
          <div className="wheel__labels">
            Salesman:
            <label className="wheel__labels">Lalo:</label>
            <input
              type="checkbox"
              onChange={() => setVendedor("Lalo")}
              className="wheel__input_checkbox"
            />
            <label className="wheel__labels">Sabino:</label>
            <input
              type="checkbox"
              onChange={() => setVendedor("Sabino")}
              className="wheel__input_checkbox"
            />
          </div>
        </div>
        <div className="input__container">
          <div className="wheel__labels">Qty: </div>
          <label className="wheel__labels">1</label>
          <input
            type="checkbox"
            onChange={() => setQty("1")}
            className="wheel__input_checkbox"
          />
          <label className="wheel__labels">2</label>
          <input
            type="checkbox"
            onChange={() => setQty("2")}
            className="wheel__input_checkbox"
          />
          <label className="wheel__labels">3</label>
          <input
            type="checkbox"
            onChange={() => setQty("3")}
            className="wheel__input_checkbox"
          />
          <label className="wheel__labels">4</label>
          <input
            type="checkbox"
            onChange={() => setQty("4")}
            className="wheel__input_checkbox"
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
