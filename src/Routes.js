import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Main } from './pages/Main';
import { AuthContext } from './context/Auth';
import { Navbar } from './components/Navbar';

export const Routes = () => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return (
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Redirect to="/login" />
        </Switch>
        <Navbar />
      </div>
    );
  }
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Redirect to="/" />
    </Switch>
  );
};
