import React from 'react';
import './App.css';
import axios from "axios";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Edit from "./views/Edit";
import Top from "./views/Top";
import {ListItemType} from './views/Top';

export const reorder = (
    list: ListItemType[],
    startIndex: number,
    endIndex: number
): ListItemType[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export type ItemType = {
    id: string;
    content: string;
};

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Methods'] = 'OPTIONS, GET, POST, PUT, PATCH, DELETE';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

function App() {


    return (
        <BrowserRouter>
            <div className="App">
                <h1 className="font-bold
                        text-6xl text-black my-12
                        text-opacity-0 inline-block
                        bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text">
                    GO REACT TO DO</h1>
                <Switch>
                    <Route exact path={"/"} component={Top}/>
                    <Route path={"/edit/:id"} component={Edit}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
