import React from 'react';
import './App.css';
import AuthPage from './components/auth-page';
import ContactPage from './components/contact-page';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import {rootReducer} from './redux/rootReducer';


const store = createStore(rootReducer);

function App() {
  return (
    <Provider store ={store}>
      <Router>
        <div className="App">
          <AuthPage />
          <Route path="/contacts" component={ContactPage} />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
