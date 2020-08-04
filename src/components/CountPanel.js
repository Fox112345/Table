import React, {Component} from 'react';

class CountPanel extends Component {

    render() {
        return (
            <div className="ui form">
                <div className="grouped fields">
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input type="radio" name="example2" checked={this.props.isMin ? true : false} onChange={this.props.changeULR} />
                            <label>32 записи</label>
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui radio checkbox">
                            <input type="radio" name="example2" checked={!this.props.isMin ? true : false} onChange={this.props.changeULR}/>
                            <label>1000 записей</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CountPanel;