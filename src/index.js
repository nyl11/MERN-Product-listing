import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from "./Context/ThemeContext";
import { CartProvider } from "./Context/CartContext";



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
<CartProvider>
    <App />
    </CartProvider>
     </ThemeProvider>
  </React.StrictMode>
);


