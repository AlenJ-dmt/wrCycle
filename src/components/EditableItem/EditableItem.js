import React, { useContext, useState } from "react";
import "./EditableItem.css";
import CustomButtom from "../CustomButton/CustomButtom";
import WheelApiService from "../../services/wheel-api-service";
import wheelContext from "../../context";
import { useHistory } from "react-router-dom";
import { ImCheckboxChecked } from "react-icons/im";
import ReactLoading from "react-loading";

const EditableItem = (props) => {
  const history = useHistory();
  const context = useContext(wheelContext);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    id,
    salesperson,
    invoice,
    quantity,
    description,
    created,
    eta,
    phone,
    isready,
    home,
    machine,
    polished,
    multipiece,
  } = props.wheelInfo;

  const [ishome, setIsHome] = useState(home);
  const [isMachine, setIsMachine] = useState(machine);
  const [isPolished, setIsPolished] = useState(polished);
  const [isMultipiece, setIsMultipiece] = useState(multipiece);

  const completeRepair = () => {
    setIsLoading(true);

    let currentDate = new Date();

    //This Code gets the current day and divided by 7 to get the week of the year

    let now = new Date();
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

    WheelApiService.wRepairCompleted(
      phone,
      `El rin o los rines del invoice ${invoice} estan listos`
    )
      .then((res) => res.json())
      .then((jsonres) => console.log(jsonres))
      .catch((err) => console.log("ping", err));

    const updatedRepair = {
      id,
      salesperson,
      invoice,
      quantity,
      descriptions: description,
      created,
      eta,
      phone,
      completedby: `${
        currentDate.getMonth() + 1
      }/${currentDate.getDate()}/${currentDate.getFullYear()}`,
      isready: true,
      completedbyweek: currentWeek,
      home: ishome,
      machine: isMachine,
      polished: isPolished,
      multipiece: isMultipiece,
    };

    WheelApiService.updateRepairOnceReady(updatedRepair).then((res) => {
      setIsLoading(false);
      setOpenModal(false);
      history.push("/");
    });
  };

  return (
    <div className="editable__item__container">
      <div className="left__container">
        <div className="invoice__container">
          <p>#{invoice}</p>
        </div>
        <p>{salesperson}</p>
        <p>{description}</p>
      </div>
      <div className="right__container">
        {isready === false ? (
          <div>
            <div
              className="modal"
              style={{ display: openModal ? "flex" : "none" }}
            >
              {isLoading ? (
                <ReactLoading
                  type="bubbles"
                  color="gray"
                  height={667}
                  width={375}
                />
              ) : (
                <div className="modal_content">
                  <button
                    onClick={() => setOpenModal(false)}
                    className="close__btn"
                  >
                    X
                  </button>
                  Select an option:
                  <div className="options__holder">
                    <div className="label__holder">
                      <label htmlFor="home">Home:</label>
                      <input
                        onChange={() => setIsHome(!ishome)}
                        className="input__box"
                        name="home"
                        type="checkbox"
                      />
                    </div>
                    <div className="label__holder">
                      <label htmlFor="machined">Machined:</label>
                      <input
                        onChange={() => setIsMachine(!isMachine)}
                        className="input__box"
                        name="machined"
                        type="checkbox"
                      />
                    </div>
                    <div className="label__holder">
                      <label htmlFor="polished">Polish:</label>
                      <input
                        onChange={() => setIsPolished(!isPolished)}
                        className="input__box"
                        name="polished"
                        type="checkbox"
                      />
                    </div>
                    <div className="label__holder">
                      <label htmlFor="multipiece">2 & 3 Piece:</label>
                      <input
                        onChange={() => setIsMultipiece(!isMultipiece)}
                        className="input__box"
                        name="multipiece"
                        type="checkbox"
                      />
                    </div>
                    <div className="label__holder">
                      <label htmlFor="none">NONE:</label>
                      <input
                        onChange={() => {
                          setIsHome(false);
                          setIsMultipiece(false);
                          setIsPolished(false);
                          setIsMachine(false);
                        }}
                        className="input__box"
                        name="none"
                        type="checkbox"
                      />
                    </div>
                    <CustomButtom
                      title="Complete"
                      color="#29BD4C"
                      onClickDo={() => {
                        completeRepair(false);
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="status__container">
              <div>
                <p className="status__label">It Is Not Ready</p>
              </div>
              <CustomButtom
                onClickDo={() => setOpenModal(true)}
                title="Terminar"
                color="#12CA13"
              />
            </div>
          </div>
        ) : (
          <div className="listo__container">
            <p className="description__holder">{`QTY: ${quantity}`}</p>
            <p>Ready</p>
            <div className="icon__container">
              <ImCheckboxChecked color="green" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableItem;
