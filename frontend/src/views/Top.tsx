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

            <ul>
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
