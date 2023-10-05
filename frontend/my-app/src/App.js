
import react, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Admin from './components/Admin';
import Ciudadano from './components/Ciudadano';
import Autoridad from './components/Autoridad';
import Home from './components/Home';
import DenunciaAnonima from './components/Denuncia-anonima';
import Registro from './components/Registro';
function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
        <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/ciudadano" component={Ciudadano} />
          <Route exact path="/autoridad" component={Autoridad} />
          <Route path="/registro" component={Registro} />
        <Route path="/denuncia-anonima" component={DenunciaAnonima} />
        </Switch>
      </Router>
    </Fragment>

  );
}

export default App;
