import React, { useContext, useEffect, useState } from "react";
import EditableItem from "../../components/EditableItem/EditableItem";
import wheelcontext from "../../context";
import "./SearchPage.css";
import ReactLoading from "react-loading";

const SearchPage = () => {
  const context = useContext(wheelcontext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);

  // useEffect(() => {
  //   setIsLoading(false);
  // }, []);

  const populateResults = () => {
    if (context.searchResult.length < 1) {
      setErr(true);
      return;
    }
    let content = context.searchResult.map((result, idx) => (
      <EditableItem key={idx} wheelInfo={result} />
    ));

    return content;
  };

  return (
    <section className="search__page">
      <h1>Resultados</h1>
      {err ? (
        <div className="error__msg" >
          <p>There are no results for your search!</p>
        </div>
      ) : (
        <div>{populateResults()}</div>
      )}
    </section>
  );
};
export default SearchPage;
