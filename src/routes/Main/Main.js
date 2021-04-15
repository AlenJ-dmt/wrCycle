import React, { useState, useContext, useEffect } from "react";
import EditableItem from "../../components/EditableItem/EditableItem";
import "./Main.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import WheelAPiService from "../../services/wheel-api-service";
import WheelContext from "../../context";

const Main = () => {
  const context = useContext(WheelContext);

  const [startDate, setStartDate] = useState(new Date());
  const [notDone, setNotDone] = useState(0);
  // const [repairQty, setRepairQty] = useState(0);

  useEffect(() => {
    getRepairsfromDate();
    getRepairsByweek();
  }, [startDate]);

  const getRepairsfromDate = () => {
    let pickedDate = `${
      startDate.getMonth() + 1
    }/${startDate.getDate()}/${startDate.getFullYear()}`;

    WheelAPiService.getRepairsByDate(pickedDate).then((wRepairList) => {
      context.setMainList(wRepairList);
    });

    let counter = 0;

    WheelAPiService.getNotReadyRepair()
      .then((jsonRes) => {
        jsonRes.forEach(
          (repair) => (counter = counter + parseInt(repair.quantity))
        );
      })
      .then(() => setNotDone(counter));
  };

  const getRepairsByweek = () => {
    let now = startDate;
    let start = new Date(now.getFullYear(), 0, 0);
    let diff = now - start;
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    let currentWeek = Math.ceil(day / 7);

    let counter = 0;

    // WheelAPiService.getRepairsByWeek(currentWeek)
    //   .then((jsonRes) => {
    //     jsonRes.forEach(
    //       (repair) => (counter = counter + parseInt(repair.quantity))
    //     );
    //   })
    //   .then(() => setRepairQty(counter));
  };

  const populateList = () => {
    return context.mainList.map((wheel, idx) => (
      <EditableItem key={idx} wheelInfo={wheel} />
    ));
  };

  return (
    <div className="main__section">
      <h1>Home</h1>
      <div className="calendar__contatiner">
        <p className="calendar__Label">Select a date: </p>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div className="onProgress__container">REPAIRING: {notDone}</div>
      {populateList()}
    </div>
  );
};

export default Main;
