import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AuthContext } from './context/Auth';
import { Navbar } from './components/Navbar';
import { Menu } from './components/Menu';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Main } from './pages/Main';
import { Add } from './pages/Add';
import { Loading } from './pages/Loading';

export const Routes = () => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }
  if (!authenticated) {
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
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/add" component={Add} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};
