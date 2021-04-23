import React, { useContext, useEffect, useState } from "react";
import EditableItem from "../../components/EditableItem/EditableItem";
import wheelcontext from "../../context";
import "./SearchPage.css";
import ReactLoading from "react-loading";
import WheelApiService from "../../services/wheel-api-service";

const SearchPage = () => {
  const context = useContext(wheelcontext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [internetConnection, setInternetConnection] = useState(true);

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setSearchResult([]);
    setInternetConnection(true);
    WheelApiService.searchInvoice(context.invoiceNumber)
      .then((wr) => {
        setErr(false);
        if (wr.length === 0) {
          setErr(true);
        }
        context.setInternet(true);
        setSearchResult(wr);
      })
      .catch((err) => {
        if (err == "TypeError: Failed to fetch") {
          setErr(false)
          setInternetConnection(false);
        }
      });
  }, [context.invoiceNumber]);

  const populateResults = () => {
    //  console.log(context.searchResult.length)
    // if (context.searchResult.length < 1) {
    //   setErr(true);
    //   return;
    // }
    if (context.searchResult === undefined) {
      return;
    }
    let content = searchResult.map((result, idx) => (
      <EditableItem key={idx} wheelInfo={result} />
    ));

    return content;
  };

  return (
    <section className="search__page">
      <h1>Resultados</h1>
      {err && (
        <div className="error__msg">
          <p>There are no results for your search!</p>
        </div>
      )}
      {!internetConnection && (
        <div className="error__msg">NO INTERNET CONNECTION</div>
      )}
      <div>{populateResults() || []}</div>
    </section>
  );
};
export default SearchPage;
