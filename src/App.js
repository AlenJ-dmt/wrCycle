import "./App.css";
import CreateNewItemPage from "./routes/CreateNewItem/CreateNewItemPage";
import { Switch, Route } from "react-router-dom";
import Main from "./routes/Main/Main";
import Header from "./components/Header/Header";
import SearchPage from "./routes/Search/SearchPage";

function App() {
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
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
