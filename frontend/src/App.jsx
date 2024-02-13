import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} /> {/* Ruta para el componente Login */}
        <Route path="/register" component={Register} /> {/* Ruta para el componente Register */}
      </Switch>
    </Router>
  );
}

export default App;
