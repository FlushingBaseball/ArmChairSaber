import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from "./Context/UserContext";



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

