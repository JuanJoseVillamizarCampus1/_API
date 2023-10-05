
import react, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </Fragment>

  );
}

export default App;
