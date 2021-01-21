import React from "react";
import Item from "./Item";

const List = React.memo<{ items: any, deleteFunc: any }>(({ items, deleteFunc }) => (
    <React.Fragment>
        {items.reverse().map((item: any, index: number) => (
            <Item item={item} index={index} key={item.ID} deleteFunc={deleteFunc} />
        ))}
    </React.Fragment>
));

export default List;
