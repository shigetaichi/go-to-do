import React, {FC, useEffect, useState} from "react"
import {useHistory} from "react-router";
import axios from "axios";

const headers = {
        headers: {
            'content-type': 'application/json',
        }
    }

const Edit: FC = () => {
    const history = useHistory();
    const [todo, setTodo] = useState<string>("");
    const [emergency, setEmergency] = useState<number | string>(0);
    const id: number | string = history.location.pathname.split('/')[history.location.pathname.split('/').length - 1];

    const handleUpdate = (id : number | string): void => {
        const data = {
            id: Number(id),
            todo: todo,
            emergency: Number(emergency),
        }
        axios.post(`/update`, data, headers).then(res => {
            history.push("/")
        })
    }

    const getData = (id: any) => {
         axios.get(`/edit/${id}`).then(res => {
             setTodo(res.data.data.todo)
             setEmergency(res.data.data.emergency)
         })
    }

    useEffect(() => {
        getData(id)
    }, [id])
    return (
        <>
            <div className="flex justify-around w-1/2 mx-auto p-6 rounded-3xl bg-gradient-to-r from-pink-500 to-yellow-500 mb-12 items-baseline">
                <p className="text-white w-1/6 fw-bold text-xl">ID: {id}</p>
                <p className="text-white w-max fw-bold text-xl">Todo:
                    <input className="inline w-3/5 text-black p-1 rounded" type="text" name={"todo"} value={todo} placeholder={"入力して"}
                           onChange={(e) => setTodo(e.target.value)}
                    /></p>
                <p className="text-white w-5/12 fw-bold text-xl">Emergency:
                    <select className="text-black p-1 rounded" name="emergency" id="emergency" defaultValue={emergency} value={emergency} onChange={(e) => setEmergency(e.target.value)}>
                        <option value="0">普通</option>
                        <option value="1">やばい</option>
                        <option value="2">激ヤバ</option>
                    </select>
                </p>
            </div>
            <button className="rounded-xl text-white text-bold text-2xl p-4 bg-gradient-to-r from-pink-500 to-yellow-500" onClick={() => handleUpdate(id)}>更新</button>
        </>
    )
}

export default Edit;
