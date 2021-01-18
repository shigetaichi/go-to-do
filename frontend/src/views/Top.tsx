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
    useEffect(() => {
        axios.get("http://localhost:3001").then(res => {
            console.log(res.data.message)
            setLists(res.data.message)
        })
    }, [])
    return (
        <ul>
            {lists && lists.map((list, i) => (
                <React.Fragment key={i}>
                    <ListItem id={list.ID} item={list.todo} emergency={list.emergency}/>
                </React.Fragment>
            ))}
        </ul>
    )
}
export default Top
