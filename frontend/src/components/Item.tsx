import React from "react";
import {Draggable} from "react-beautiful-dnd";
import {Link} from "react-router-dom";
import {ListItemType} from "../views/Top";

const classes = "w-1/5 bg-clip-text text-black text-opacity-0 bg-gradient-to-r from-pink-500 to-yellow-500"

const Item = ({item, index, deleteFunc}: { item: ListItemType, index: any, deleteFunc: any}) => {
    return (
        <Draggable draggableId={String(item.ID)} index={index}>
            {provided => (
                <>
                    <li
                        className="flex justify-around p-4 rounded bg-white w-full mx-auto mb-8"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <p className={classes}>{item.ID} </p>
                        <p className={classes}>{item.todo} </p>
                        {item.emergency === 0 ?
                            <p className={classes}>普通</p> :
                            item.emergency === 1 ?
                                <p className={classes}>やばい</p> :
                                <p className={classes}>激ヤバ</p>
                        }
                        <p className={classes}><Link to={`/edit/${item.ID}`}>edit</Link></p>
                        <p className={classes} onClick={() => deleteFunc(item.ID)}>delete</p>
                    </li>
                </>
            )}
        </Draggable>
    );
};

export default Item;
