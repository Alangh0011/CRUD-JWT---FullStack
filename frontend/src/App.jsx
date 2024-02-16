import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Home from './Home-page/Home'
import { useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} /> {/* Ruta para el componente Login */}
        <Route path="/register" component={Register} /> {/* Ruta para el componente Register */}
        <Route path="/home">
        {isLoggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
        <Login setIsLoggedIn={setIsLoggedIn} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
