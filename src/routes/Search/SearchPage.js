import React, { useEffect, useContext, useState } from "react";
import EditableItem from "../../components/EditableItem/EditableItem";
import wheelcontext from "../../context";
import "./SearchPage.css";

const SearchPage = () => {
  const context = useContext(wheelcontext);

  const populateResults = () => {
    return context.searchResult.map((result, idx) => (
      <EditableItem
        key={idx}
        invoiceNum={result.invoice}
        salesman={result.salesperson}
        date={result.created}
        phone={result.phone}
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
