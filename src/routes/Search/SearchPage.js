import React, { useContext, useEffect, useState } from "react";
import EditableItem from "../../components/EditableItem/EditableItem";
import wheelcontext from "../../context";
import "./SearchPage.css";
import ReactLoading from "react-loading";

const SearchPage = () => {
  const context = useContext(wheelcontext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false)
    
  },[])

  const populateResults = () => {
    let content =  context.searchResult.map((result, idx) => (
      <EditableItem key={idx} wheelInfo={result} />
    ));
    
    return content
  };

  return (
    <section className="search__page">
      <h1>Resultados</h1>
      {isLoading ? (
        <div className="loading__container"><ReactLoading type="bubbles" color="gray" height={667} width={375} /></div>
      ) : (
        <div>{populateResults()}</div>
      )}
    </section>
  );
};
export default SearchPage;
