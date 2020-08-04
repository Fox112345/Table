import React from 'react';

class Modal extends React.Component{

    state = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    }

    showPopup = () => {
        if (this.props.showModal) return 'active visible'
        return ''
    }

    isFieldsFilled = () => {
        // Проверяем все ли поля заполнены
        for (let key in this.state) {
            if (!this.state[key]) return "disabled"
        }
        return ''
    }

    clearModal = () => {
        // Очищаем форму
        this.setState({
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        })
    }

    addData = () => {
        this.props.addData(this.state)
        this.clearModal()
        this.props.hidePopup()

    }



    render() {
        return (
            <div className={`ui dimmer modals page transition ${this.showPopup()}`}>
                <div className={`ui standard modal transition ${this.showPopup()}`}>
                    <div className="header">Введите данные в поля</div>
                        <div className="content">
                            <div
                                className='ui form'>
                            <p><input
                                placeholder=' id'
                                value={this.state.id}
                                type='number'
                                name='id'
                                onChange={(e) => this.setState({id: e.target.value})}
                            /></p>
                            <p><input
                                placeholder=' firstName '
                                name='firstName'
                                value={this.state.firstName}
                                type='text'
                                onChange={(e) => this.setState({firstName: e.target.value})}
                            /></p>
                            <p><input
                                placeholder=' lastName '
                                name='lastName'
                                value={this.state.lastName}
                                type='text'
                                onChange={(e) => this.setState({lastName: e.target.value})}
                            /></p>
                            <p><input
                                placeholder=' email '
                                name='email'
                                value={this.state.email}
                                type='email'
                                onChange={(e) => this.setState({email: e.target.value})}
                            /></p>
                            <p><input
                                placeholder=' phone '
                                name='phone'
                                value={this.state.phone}
                                type='tel'
                                pattern="([0-9]{3})[0-9]{3}-[0-9]{4}"
                                onChange={(e) => this.setState({phone: e.target.value})}
                            /></p>

                            <button className="ui button"
                                    onClick={this.props.hidePopup}>
                                Отмена
                            </button>

                            <button className={`ui primary button ${this.isFieldsFilled()}`}
                                    onClick={this.addData}>
                                Добавить данные
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        );
    }


};

export default Modal;