import React, { useEffect, useState } from "react";
import "./EditScreen.css";
import CustomButtom from "../../components/CustomButton/CustomButtom";
import { useParams } from "react-router-dom";
import WheelApiService from "../../services/wheel-api-service";

const EditScreen = () => {
  const { invoiceNum } = useParams();

  const [state, setState] = useState();

  useEffect(() => {
    WheelApiService.searchInvoice(invoiceNum).then((wheel) => setState(wheel));
  });

  return (
    <section className="edit__screen">
      <div className="edit__container">
        <div className="edit__input__container">
          <label>Invoice:</label>
          <input value={"" || state.invoice} className="edit__input" />
        </div>
        <div className="edit__input__container">
          <label>Salesman:</label>
          <input className="edit__input" />
        </div>
        <div className="edit__input__container">
          <label>Description:</label>
          <input className="edit__input" />
        </div>
        <div className="edit__input__container">
          <label>Quantity:</label>
          <input className="edit__input" />
        </div>
        <div className="edit__input__container">
          <label>Status:</label>
          <input className="edit__input" />
        </div>
        <CustomButtom title="Save" />
      </div>
    </section>
  );
};
export default EditScreen;
