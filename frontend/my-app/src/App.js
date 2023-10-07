
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Admin from './components/Admin';
import Ciudadano from './components/Ciudadano';
import Autoridad from './components/Autoridad';
import Home from './components/Home';
import DenunciaAnonima from './components/Denuncias/Denuncia-anonima';
import Registro from './components/registro/Registro';
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
