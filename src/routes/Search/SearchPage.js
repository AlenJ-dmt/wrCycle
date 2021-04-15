import React, { useContext } from "react";
import EditableItem from "../../components/EditableItem/EditableItem";
import wheelcontext from "../../context";
import "./SearchPage.css";

const SearchPage = () => {
  const context = useContext(wheelcontext);

  const populateResults = () => {
    return context.searchResult.map((result, idx) => (
      <EditableItem
        key={idx}
        wheelInfo={result}
      />
    ));
  };

  return (
    <section className="search__page">
      <h1>Resultados</h1>
      {populateResults()}
    </section>
  );
};
export default SearchPage;
