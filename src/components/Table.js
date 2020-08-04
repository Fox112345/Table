import React from 'react';
import TibleItem from "./TibleItem";

const Table = (props) => {
    // Рисуем шапку из конфига, что бы можно было использовать таблицу с другими данными
    const getTebleHead = props.headConfig.map((item) => <th
        key={item}
        onClick={() => {
        props.onSort(item)
     }}>

        {item} { props.sortField===item && props.reversDirection ? '▲' :
                 props.sortField===item && !props.reversDirection ? '▼' :
                 null }
    </th>)

    const getTableItems = props.data.map((itemData) => <TibleItem
        key={itemData.id + itemData.phone}
        itemData={itemData}
        itemCollumns={props.headConfig}
        setCurrentUser={props.setCurrentUser}
        currentUser={props.currentUser}
    />)

    return (
        <table className="ui celled table">
            <thead>
            <tr>
                {getTebleHead}
            </tr>
            </thead>
            <tbody>
                {getTableItems}
            </tbody>
        </table>
    );
};

export default Table;