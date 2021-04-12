import React, { useContext } from "react";
import "./EditableItem.css";
import CustomButtom from "../CustomButton/CustomButtom";
import WheelApiService from "../../services/wheel-api-service";
import wheelContext from "../../context";

const EditableItem = (props) => {
  const context = useContext(wheelContext);

  return (
    <div className="editable__item__container">
      <div className='left__container'>
        <p>#{props.invoiceNum}</p>
        <p>{props.salesman}</p>
        <p>{props.date}</p>
      </div>
      <div className="right__container">
        {props.isready ? (
          <div className="status__container">
            {/* <CustomButtom title="Desmontado" color="#FF5733" />
        <CustomButtom title="Reparando" color="#FFC433" /> */}
            <div>
              <p className="status__label">No esta listo</p>
            </div>
            <CustomButtom
              onClickDo={() => {
                console.log(context.textMessage);
                WheelApiService.wRepairCompleted(
                  props.phone,
                  context.textMessage
                )
                  .then((res) => res.json())
                  .then((jsonres) => console.log(jsonres))
                  .catch((err) => console.log("ping", err));
              }}
              title="Terminar"
              color="#12CA13"
            />
          </div>
        ) : (
          <div className="listo__container">
            <p>Listo</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditableItem;
