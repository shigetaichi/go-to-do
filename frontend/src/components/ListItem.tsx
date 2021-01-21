import React, {FC} from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import {useHistory} from "react-router";

interface Props {
    id: number;
    item: string;
    emergency: number;
}

const listStyle = {
    'display': 'flex'
}

const ListItem: FC<Props> = (props) => {
    const history = useHistory();
    const handleDelete = async (id: number) => {
        const res = await axios.post(`/delete/${id}`);
        console.log(res)
        // const res2 = await axios.get("/");
    }

    return (
        <>
            <li style={listStyle} className="p-4 rounded bg-white">
                <p>{props.id}　</p>
                <p>{props.item}　</p>
                {props.emergency === 0 ?
                    <p>普通</p> :
                    props.emergency === 1 ?
                        <p>やばい</p> :
                        <p>激ヤバ</p>
                }
                <p><Link to={`/edit/${props.id}`}>edit</Link></p>
                <p onClick={() => handleDelete(props.id)}>delete</p>
            </li>
        </>
    )
}

export default ListItem
