import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import NotFound from "./views/NotFound";
import Login from "./views/Login";
import Main from "./views/Main";
import {
  FirebaseContext,
  firebaseApp,
  signIn,
  signOut,
  writeTemplate,
  updateTemplate,
  deleteTemplate,
  googleProvider,
  twitterProvider,
  githubProvider
} from "./firebase";
import { useHistory } from "react-router-dom";
import { Template } from "./types/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { useListVals } from 'react-firebase-hooks/database';

const App = () => {
  const history = useHistory();
  const [user] = useAuthState(firebaseApp.auth());
  const [customTemplates] = useListVals<Template>(user && firebaseApp.database().ref('template/' + user.uid), { keyField: 'keyField' });

  if (user && history) history.push("/main/account");

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        customTemplates,
        updateTemplate,
        user,
        signIn,
        signOut,
        writeTemplate,
        deleteTemplate,
        googleProvider,
        twitterProvider,
        githubProvider
      }}
    >
      <Router>
        <main className="max-w-xl mx-auto bg-black">
          <Switch>
            <Route exact path="/">
              <Redirect to="/main" />
            </Route>
            <Route path="/main">
              <Main />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </main>
      </Router>
    </FirebaseContext.Provider>
  );
};

export default App;
