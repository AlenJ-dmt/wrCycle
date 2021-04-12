import React, { useState, useContext, useEffect } from "react";
import "./WheelItem.css";
import CustomButton from "../CustomButton/CustomButtom";
import store from "../../store";
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
      completedby: ""
    };
    console.log("hello");
    WheelsApiService.initRepair(newRepair).then((res) => console.log(res));

    history.push("/");
  };

  return (
    <div className="wheel__item__container">
      <form className="wheel__component__container">
        <label className="wheel__labels">
          Invoice #:{" "}
          <input
            name="invoiceNum"
            className="wheel__input"
            onChange={(ev) => inputChangeHandler(ev)}
          />
        </label>
        <label className="wheel__labels">
          Phone #:{" "}
          <input
            name="phone"
            className="wheel__input"
            onChange={(ev) => inputChangeHandler(ev)}
          />
        </label>
        <label className="wheel__labels">
          ETA :{" "}
          <input
            name="eta"
            className="wheel__input"
            onChange={(ev) => inputChangeHandler(ev)}
          />
        </label>
        <div className="wheel__labels">
          Vendedor:
          <input
            name="vendedor"
            onChange={(ev) => inputChangeHandler(ev)}
            className="wheel__input"
            value={state.vendedor}
          />
        </div>
        <label className="wheel__labels">
          Qty
          <input
            name="quantity"
            onChange={(ev) => inputChangeHandler(ev)}
            className="wheel__input"
            value={state.quantity}
          />
        </label>
        <label className="wheel__labels">
          Description:{" "}
          <input
            name="description"
            onChange={(ev) => inputChangeHandler(ev)}
            className="wheel__input"
            value={state.description}
          />
        </label>
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
