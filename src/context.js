import React from "react";

const WheelContext = React.createContext({
  searchResult: [],
  reportList: [],
  setReportList: [],
  setResults: () => {},
  mainList: [],
  setMainList: () => {},
  invoiceNumber: "",
  setInvoiceNumber: () => {},
  noInternetError: "NO INTERNET CONNECTION",
  internet: true,
  setInternet: () => {},
  textMessage:
    "Thank you for your business, Your wheel is ready to be pick up!",
});

export default WheelContext;

export class WheelProvider extends React.Component {
  state = {
    searchResult: [],
    mainList: [],
    reportList: [],
    invoiceNumber: "",
    noInternetError: "NO INTERNET CONNECTION",
    internet: true,
    textMessage:
      "Thank you for your business, Your wheel is ready to be pick up!",
  };

  setInternet = (value) => {
    this.setState({
      internet: value,
    });
  };

  setInvoiceNumber = (num) => {
    this.setState({
      invoiceNumber: num,
    });
  };
  setReportList = (rList) => {
    this.setState({
      reportList: rList,
    });
  };
  setMainList = (newList) => {
    this.setState({
      mainList: newList,
    });
  };

  setResults = (wr) => {
    this.setState({
      searchResult: wr,
    });
  };

  render() {
    const value = {
      searchResult: this.state.searchResult,
      mainList: this.state.mainList,
      setMainList: this.setMainList,
      setResults: this.setResults,
      textMessage: this.state.textMessage,
      reportList: this.state.reportList,
      setReportList: this.setReportList,
      invoiceNumber: this.state.invoiceNumber,
      setInvoiceNumber: this.setInvoiceNumber,
      noInternetError: "NO INTERNET CONNECTION",
      internet: this.state.internet,
      setInternet: this.setInternet,
    };

    return (
      <WheelContext.Provider value={value}>
        {this.props.children}
      </WheelContext.Provider>
    );
  }
}
