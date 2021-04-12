import React from "react";
import "./CreateNewItemPage.css";
import WheelItem from "../../components/WheelItem/WheelItem";

const CreateNewItemPage = () => {
  return (
    <section className="create__new__wheel__section">
      <h1>Create New Repair</h1>
      <WheelItem />
    </section>
  );
};

export default CreateNewItemPage;
