import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/index";
import signin from "./pages/signin";
import signup from "./pages/signup";
import Admin from "./pages/admin";
import Services from "./pages/services";
import customerDetails from "./pages/cutomerDetails";
import loan from "./pages/loan";
import transactions from "./pages/transactions";
import complain from "./pages/complain";
import projectUpdate from "./pages/projectUpdate";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact></Route>
        <Route path="/signin" component={signin} exact></Route>
        <Route path="/signup" component={signup} exact></Route>
        <Route path="/admin" component={Admin} exact></Route>
        <Route path="/services" component={Services} exact></Route>
        <Route path="/cutomerDetails" component={customerDetails} exact></Route>
        <Route path="/loan" component={loan} exact></Route>
        <Route path="/transactions" component={transactions} exact></Route>
        <Route path="/complain" component={complain} exact></Route>
        <Route path="/projectUpdate" component={projectUpdate} exact></Route>
      </Switch>
    </Router>
  );
}

export default App;
