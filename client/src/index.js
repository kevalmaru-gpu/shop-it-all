import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './store/auth-context';
import { UserProvider } from './store/user-context';
import { UiContextProvider } from './store/ui-context';
import { ProductProvider } from './store/product-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UiContextProvider>
      <ProductProvider>
        <UserProvider>
          <AuthProvider>
              <App/>
          </AuthProvider>
        </UserProvider>
      </ProductProvider>
    </UiContextProvider>
    
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100;0,500;0,700;0,800;1,300;1,500&display=swap" rel="stylesheet"/>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
