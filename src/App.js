import React from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import History from './components/History';
import PrivateRoute from './utils/PrivateRoute';
import Dashboard from './components/Dashboard';
import NoMatch from './components/NoMatch';
import Feature from './components/Features';
import Gallery from './components/Gallery';
import UserProfile from './components/UserProfile';
import "./App.css";


function App() {
  return (
    <Container>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/dashboard' component={Dashboard} />
          <PrivateRoute path='/profile' component={UserProfile} />
          <PrivateRoute path='/history' component={History} />
          <PrivateRoute path='/feature' component={Feature} />
          <PrivateRoute path='/gallery' component={Gallery} />
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </BrowserRouter>

    </Container>
  );
}

export default App;
