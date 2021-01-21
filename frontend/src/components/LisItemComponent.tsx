import React, {FC} from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import {useHistory} from "react-router";

import {ListItem} from "../drag";

const listStyle = {
    'display': 'flex'
}

const LisItemComponent: FC<ListItem> = (props) => {
    const history = useHistory();
    const handleDelete = async (id: number) => {
        const res = await axios.post(`/delete/${id}`);
        console.log(res)
        // const res2 = await axios.get("/");
    }

    return (
        <>
            <li style={listStyle} className="p-4 bgc-white">
                <p>{props.ID}　</p>
                <p>{props.todo}　</p>
                {props.emergency === 0 ?
                    <p>普通</p> :
                    props.emergency === 1 ?
                        <p>やばい</p> :
                        <p>激ヤバ</p>
                }
                <p><Link to={`/edit/${props.ID}`}>edit</Link></p>
                <p onClick={() => handleDelete(props.ID)}>delete</p>
            </li>
        </>
    )
}

export default LisItemComponent
