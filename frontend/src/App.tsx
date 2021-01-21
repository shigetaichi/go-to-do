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
                {/*<header className="App-header">*/}
                {/*    <p>*/}
                {/*        Edit <code>src/App.tsx</code> and save to reload.*/}
                {/*    </p>*/}
                {/*    <a*/}
                {/*        className="App-link"*/}
                {/*        href="https://reactjs.org"*/}
                {/*        target="_blank"*/}
                {/*        rel="noopener noreferrer"*/}
                {/*    >*/}
                {/*        Learn React*/}
                {/*    </a>*/}
                {/*</header>*/}
            </div>
            <Switch>
                <Route exact path={"/"} component={Top}/>
                <Route path={"/edit/:id"} component={Edit}/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
