import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { LanguageContext, UserContext } from './Components/contexts'
import i18n from './Components/utils/i18n';
import Participants from './Participants';
import MainContainer from './Components/AuthContainer/MainComponent';
import requester from './Components/utils/requester';
import Navbar from './Navbar'
import { Switch } from 'react-router-dom';
import More_information from './Components/More_information';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AuthContainer from './Components/AuthContainer/AuthContainer';
import context from './Components/contexts';

export default function App() {
  const language = useState(localStorage.getItem('language') || 'en');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || null));

  useEffect(() => {
    requester.get('/auth/me').then(res => {
      if (res.data.status === 'success') {
        setUser(res.data.payload);
      } else {
        setUser(null)
      }
    });
  }, [])

  useEffect(() => {
    localStorage.setItem('language', language[0])
    i18n.changeLanguage(language[0])
  },[language[0]])

  useEffect(() => {
    if (!user) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } else {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);


  return (
    <>
      <Router>
        <Switch>
          <Router path="/more" children={<More_information />} />
          <Router path="/all" children={<Participants/>} />
          <Router path="/" children={
            <LanguageContext.Provider value={language}>
              <UserContext.Provider value={[user, setUser]}>
                <div className='body'>
                    {!user ?
                      <AuthContainer />
                    : <>
                      <MainContainer /> </>}
                </div>
              </UserContext.Provider>
            </LanguageContext.Provider>} />
        </Switch>
      </Router>
    </>
  );
}


