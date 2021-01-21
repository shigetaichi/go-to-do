import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {ListItem} from "./components";
import axios from "axios";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Edit from "./views/Edit";
import Top from "./views/Top";


axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'OPTIONS, GET, POST, PUT, PATCH, DELETE';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <h1 className="font-bold text-6xl text-black text-opacity-0 inline-block bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text">GO REACT TO DO</h1>
            <Switch>
                <Route exact path={"/"} component={Top}/>
                <Route path={"/edit/:id"} component={Edit}/>
            </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
