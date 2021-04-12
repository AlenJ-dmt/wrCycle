import React, { useState, useContext, useEffect } from "react";
import EditableItem from "../../components/EditableItem/EditableItem";
import store from "../../store";
import "./Main.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WheelAPiService from "../../services/wheel-api-service";
import WheelContext from "../../context";

const Main = () => {
  const context = useContext(WheelContext);

  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    getRepairsfromDate();
  }, [startDate]);

  const getRepairsfromDate = () => {
    let pickedDate = `${
      startDate.getMonth() + 1
    }/${startDate.getDate()}/${startDate.getFullYear()}`;

    WheelAPiService.getRepairsByDate(pickedDate).then((wRepairList) => {
      context.setMainList(wRepairList);
    });
  };

  const populateList = () => {
    return context.mainList.map((wheel, idx) => (
      <EditableItem
        key={idx}
        invoiceNum={wheel.invoice}
        salesman={wheel.salesperson}
        date={wheel.created}
        phone={wheel.phone}
        isready={wheel.isready}
      />
    ));
  };

  return (
    <div className="main__section">
      <h1>Home</h1>
      <div className="calendar__contatiner">
        <p className="calendar__Label">Seleccionar fecha: </p>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      {populateList()}
    </div>
  );
};

export default Main;
