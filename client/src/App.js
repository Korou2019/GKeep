import React, { useCallback, useEffect, useRef, useState } from 'react';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Home from './pages/Home';
import Notes from './pages/Notes';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import axios from 'axios';
import { AuthContext } from './context/auth-context';

let logoutTimer;

function App() {
  let state = useRef(JSON.parse(localStorage.getItem('user')));

  const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      'user',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenExpirationDate.toISOString()
      })
    );
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    state.current = JSON.parse(localStorage.getItem('user'));

  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('user');
    let token = null;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    state.current = JSON.parse(localStorage.getItem('user'));
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('user'));
    
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, storedData.token, new Date(storedData.expiration));
    }
  }, [login]);



  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/register" exact>
            <SignUp />
          </Route>
          <Route path="/login" exact>
            <SignIn />
          </Route>
          {
            state.current
            ?
            <Route path="/notes" exact>
              <Notes />
            </Route>
            :
            <Redirect to="/login" />
          }
          <Route path="*">
            <Redirect to="/" />
          </Route>        
        </Switch>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
