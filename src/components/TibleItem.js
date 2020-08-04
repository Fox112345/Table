import React, {Component} from 'react';

class TibleItem extends Component {
    state = {
        isActive: ''
    }

    render() {
        const getCollumnns = this.props.itemCollumns.map( collumnName => <td key={this.props.itemData[collumnName]}>{this.props.itemData[collumnName]}</td>)
        return (
            <tr
                onClick={() => this.props.setCurrentUser(this.props.itemData)}
                className={this.props.currentUser.id === this.props.itemData['id'] ? "active" : ''}>
                    {getCollumnns}
            </tr>
        );
    }
}

export default TibleItem;