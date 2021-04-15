import "./App.css";
import CreateNewItemPage from "./routes/CreateNewItem/CreateNewItemPage";
import { Switch, Route } from "react-router-dom";
import Main from "./routes/Main/Main";
import Header from "./components/Header/Header";
import SearchPage from "./routes/Search/SearchPage";
import ReportPage from "./routes/Reports/ReportPage";
import { ImStatsBars } from "react-icons/im";
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/home">
          <Main />
        </Route>
        <Route exact path="/create">
          <CreateNewItemPage />
        </Route>
        <Route path="/search">
          <SearchPage />
        </Route>
        <Route path="/reports">
          <ReportPage />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
      <button
        onClick={() => history.push("/reports")}
        className="report__icon__container"
      >
        <ImStatsBars size={50} className="report__icon" color="white" />
      </button>
    </div>
  );
}

export default App;
