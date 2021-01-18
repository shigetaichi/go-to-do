import React, {FC, useEffect, useState} from "react"
import {useHistory} from "react-router";
import axios from "axios";

const headers = {
        headers: {
            'content-type': 'multipart/form-data',
        }
    }

const Edit: FC = () => {
    const history = useHistory();
    const [todo, setTodo] = useState<string>("");
    const [emergency, setEmergency] = useState<number | string>(0);
    const id: number | string = history.location.pathname.split('/')[history.location.pathname.split('/').length - 1];

    const handleUpdate = (id : number | string): void => {
        const data = {
            id: id,
            emergency: emergency,
        }
        axios.post(`/update`, data, headers).then(res => {
            console.log(res)
            // history.push("/")
        })
    }

    const getData = (id: any) => {
         axios.get(`/edit/${id}`).then(res => {
             console.log(res.data.data)
             setTodo(res.data.data.todo)
             setEmergency(res.data.data.emergency)
         })
    }

    useEffect(() => {
        getData(id)
    }, [id])
    return (
        <>
            <p>ID: {id}</p>
            <p>Todo:
                <input type="text" name={"todo"} value={todo} placeholder={"入力して"}
                       onChange={(e) => setTodo(e.target.value)}
                /></p>
            <p>Emergency:
                <select name="emergency" id="emergency" defaultValue={emergency} value={emergency} onChange={(e) => setEmergency(e.target.value)}>
                    <option value="0">普通</option>
                    <option value="1">やばい</option>
                    <option value="2">激ヤバ</option>
                </select>
            </p>
            <button onClick={() => handleUpdate(id)}>更新</button>
        </>
    )
}

export default Edit;
