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
import { Info } from './pages/Info';

export const Routes = () => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (!currentUser) {
    return (
      <div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/info" component={Info} />
          <Redirect to="/login" />
        </Switch>
        <Navbar />
      </div>
    );
  }
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Menu currentPage={'/'} />
          <Main />
        </Route>
        <Route exact path="/add">
          <Menu currentPage={'/add'} />
          <Add />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
};
