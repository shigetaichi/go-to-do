import React, {FC, useEffect, useState} from "react"
import axios from "axios";
import {List} from "../components";
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {reorder} from "../App";

export interface ListItemType {
    ID: number;
    todo: string;
    emergency: number;
    CreatedAt?: any;
    UpdatedAt?: any;
    DeletedAt?: any;
}

const Top: FC = () => {
    const initial: ListItemType[] = Array.from({length: 10}, (v, k) => k).map(k => {
        return {
            ID: Number(k),
            todo: `Item ${k}`,
            emergency: Number(k),
        };
    });
    const [list, setList] = useState({items: initial});

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const items = reorder(
            list.items,
            result.source.index,
            result.destination.index
        );

        setList({items});
    };
    const [newTodo, setNewTodo] = useState<string>('')

    const handleAdd = () => {
        axios.post('/add', {todo: newTodo, emergency: 1}).then(getTodos)
        setNewTodo("")
    }

    const handleDelete = (id: number) => {
        axios.post(`/delete/${id}`).then(res => {
            console.log(res)
            getTodos();
        })
    }

    const getTodos = () => {
        axios.get("http://localhost:3001").then(res => setList({items: res.data.message.reverse()}))
    }

    useEffect(() => {
        getTodos()
        return () => {
            getTodos()
        }
    }, [])

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div>
                <div className="flex justify-around w-1/2 mx-auto mb-12 p-4 rounded bg-gradient-to-r from-pink-500 to-yellow-500">
                    <input
                        className={"w-2/3 text-2xl p-2"}
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                    />
                    <button className="text-white px-4" onClick={handleAdd}>追加</button>
                </div>

                <Droppable droppableId="list">
                    {provided => (
                        <ul ref={provided.innerRef} {...provided.droppableProps} className="px-96 py-4 bg-gradient-to-r from-pink-500 to-yellow-500">
                            <List items={list.items} deleteFunc={handleDelete}/>
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    )
}
export default Top
