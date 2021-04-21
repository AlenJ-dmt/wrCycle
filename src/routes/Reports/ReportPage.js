import React, { useState, useEffect, useContext } from "react";
import WheelAPiService from "../../services/wheel-api-service";
import "./ReportPage.css";
import DatePicker from "react-datepicker";
import EditableItem from "../../components/EditableItem/EditableItem";
import WheelContext from "../../context";

const ReportPage = () => {
  const [repairQty, setRepairQty] = useState(0);
  const [homeCounter, setHomeCounter] = useState(0);
  const [machineCounter, setMachineCounter] = useState(0);
  const [polishCounter, setPolishedCounter] = useState(0);
  const [multiCounter, setMultiCounter] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [listStyle, setListStyle] = useState("all");

  const contexto = useContext(WheelContext);

  useEffect(() => {
    getCurrentWeek();
  }, [startDate]);

  const getCurrentWeek = () => {
    //This Code gets the current day and divided by 7 to get the week of the year

    let now = startDate;
    let start = new Date(now.getFullYear(), 0, 0);
    let diff = now - start;
    let oneDay = 1000 * 60 * 60 * 24;
    let day = Math.floor(diff / oneDay);
    let currentWeek = (day / 7).toFixed(1);
    let stringWeek = ("" + currentWeek).split(".");

    //This code make the week to be counted from saturday to friday

    if (parseInt(stringWeek[1]) < 2) {
      currentWeek = Math.floor(currentWeek);
    } else {
      currentWeek = Math.ceil(currentWeek);
    }

    let counter = 0;
    let homeContador = 0;
    let machineContador = 0;
    let polishedContador = 0;
    let multiContador = 0;

    WheelAPiService.getRepairsByWeek(currentWeek)
      .then((jsonRes) => {
        contexto.setReportList(jsonRes);
        jsonRes.forEach((repair) => {
          counter = counter + parseInt(repair.quantity);
          if (repair.home) {
            homeContador = homeContador + parseInt(repair.quantity);
          } else if (repair.machine) {
            machineContador = machineContador + parseInt(repair.quantity);
          } else if (repair.polished) {
            polishedContador = polishedContador + parseInt(repair.quantity);
          } else if (repair.multipiece) {
            multiContador = multiContador + parseInt(repair.quantity);
          }
        });
      })
      .then(() => {
        setRepairQty(counter);
        setHomeCounter(homeContador);
        setMachineCounter(machineContador);
        setPolishedCounter(polishedContador);
        setMultiCounter(multiContador);
      });
  };

  const populateReportList = () => {
    if (listStyle === "all") {
      return contexto.reportList.map((wheel, idx) => (
        <EditableItem key={idx} wheelInfo={wheel} />
      ));
    } else if (listStyle === "machined") {
      return contexto.reportList.map((wheel, idx) => {
        if (wheel.machine) {
          return <EditableItem key={idx} wheelInfo={wheel} />;
        }
      });
    } else if (listStyle === "polished") {
      return contexto.reportList.map((wheel, idx) => {
        if (wheel.polished) {
          return <EditableItem key={idx} wheelInfo={wheel} />;
        }
      });
    }
  };

  return (
    <section className="report__section">
      <h1>Reporte</h1>
      <div className="calendar__contatiner">
        <p className="calendar__Label">Select a week: </p>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
      <div className="report__box">
        <p>Completed this week: {repairQty}</p>
        <p>Home: {homeCounter} </p>
        <p>Machine: {machineCounter} </p>
        <p>Poslished: {polishCounter} </p>
        <p>2 || 3 Piece Wheel: {multiCounter} </p>
      </div>
      <div className="wheel__style__container">
        <div className="inside__style_holder">
          <label>All</label>
          <input className="wheel__style__checkBox"
            onChange={() => setListStyle("all")}
            name="wheelStyle"
            type="radio"
          />
        </div>
        <div className="inside__style_holder">
          <label>Machined</label>
          <input className="wheel__style__checkBox"
            onChange={() => setListStyle("machined")}
            name="wheelStyle"
            type="radio"
          />
        </div>
        <div className="inside__style_holder">
          <label>Polished</label>
          <input className="wheel__style__checkBox"
            onChange={() => setListStyle("polished")}
            name="wheelStyle"
            type="radio"
          />
        </div>
      </div>
      {populateReportList()}
    </section>
  );
};

export default ReportPage;
