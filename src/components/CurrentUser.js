import React from 'react';

const isEmpty = x => !Object.keys(x).length

const CurrentUser = (props) => {
    const { description, address, firstName, lastName } = props.currentUser

    if (isEmpty(props.currentUser)) return null

    return (
        <>
            <p>Выбран пользователь <b>{firstName} {lastName}</b></p>
            <p>Описание:<br/>
                <textarea defaultValue={description}></textarea>
            </p>
            <p>Адрес проживания: <b>{address.streetAddress}</b></p>
            <p>Город: <b>{address.city}</b></p>
            <p>Провинция/штат: <b>{address.state}</b></p>
            <p>Индекс: <b>{address.zip}</b></p>
        </>
    )

};

export default CurrentUser;