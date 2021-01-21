import React, {FC, useEffect, useState} from "react"
import axios from "axios";
import {ListItem} from "../components";

interface ListItem {
    ID: number;
    todo: string;
    emergency: number;
    CreatedAt?: any;
    UpdatedAt?: any;
    DeletedAt?: any;
}

const Top: FC = () => {
    const [lists, setLists] = useState<Array<ListItem>>([])
    const [newTodo, setNewTodo] = useState<string>('')

    const handleAdd = () => {
        axios.post('/add', {todo: newTodo, emergency: 1}).then(getTodos)
    }

    const getTodos = () => {
        axios.get("http://localhost:3001").then(res => setLists(res.data.message))
    }

    useEffect(() => {
        getTodos()
    }, [])

    return (
        <div>
            <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
            <button onClick={handleAdd}>追加</button>

            <ul className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500">
                {lists && lists.map((list, i) => (
                    <React.Fragment key={i}>
                        <ListItem id={list.ID} item={list.todo} emergency={list.emergency}/>
                    </React.Fragment>
                ))}
            </ul>
        </div>
    )
}
export default Top
