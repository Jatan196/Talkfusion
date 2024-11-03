import React from "react";
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null}  persistor={persistor} >
            <App />
            <Toaster />
            </PersistGate>
        </Provider>
        
    </React.StrictMode>
);
// upper portion cutting , when chat list is>>
// socket problem due to same sender and reciever di    