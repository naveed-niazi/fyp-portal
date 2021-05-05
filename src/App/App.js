import './App.css';
//---
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
//---
import Signup from './genericViews/Signup'
//---
const hist = createBrowserHistory();

function App() {
  return (
    <Router history={hist}>
      <Switch>
        {/* Login routes for students */}
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </Router>
  );
}

export default App;
