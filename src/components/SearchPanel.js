import React, {Component} from 'react';

class SearchPanel extends Component {
    state = {
        term: ''
    }

    onSearch = (e) => {
        const term = e.target.value
        this.setState({
            term
        })
        this.props.onSearch(term)
    }

    render() {
        return (
            <div className="ui input">
                <input
                    type="text"
                    placeholder="Search..."
                    value={this.state.term}
                    onChange={this.onSearch}
                />
            </div>
        );
    }
}

export default SearchPanel;