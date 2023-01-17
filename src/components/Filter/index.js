import { Component } from "react";

export default class Filter extends Component {
    state = {
        searchValue: ''
    }

    buttons = [
        { value: 'all', text: 'All' },
        { value: 'isDone', text: 'Active' },
        { value: 'isImportant', text: 'Important' }
    ]

    onInputHandler = (e) => {
        const { value } = e.target;
        this.setState({
            searchValue: value
        });
        this.props.onSearched(value);
    }

    render() {
        const { searchValue } = this.state;
        const { onButtonClicked, filterValue } = this.props;

        const buttonsEls = this.buttons.map(({ value, text }) => {
            const stateClass = (value === filterValue) ? 'btn-primary' : 'btn-outline-primary';

            return (
                <button 
                    key={ value }
                    className={ `btn ${stateClass}` }
                    type="button" 
                    onClick={ () => onButtonClicked(value)}>
                    { text }
                </button>
            )
        });

        return (
            <div className="row mb-3">
                <div className="col-7">
                    <input 
                        className="form-control" 
                        type="search" 
                        placeholder="type something..."
                        value={ searchValue }
                        onInput={ this.onInputHandler }></input>
                </div>
                <div className="col-5 btn-group">
                    { buttonsEls }
                </div>
            </div>
        )
    }
}