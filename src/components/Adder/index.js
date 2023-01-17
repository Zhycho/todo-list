import { Component } from "react";

export default class Adder extends Component {
    state = {
        valueToAdd: ''
    }

    setValueToAdd = (e) => {
        this.setState({
            valueToAdd: e.target.value
        });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        
        if (!this.state.valueToAdd) return;

        this.props.onItemAdded(this.state.valueToAdd);
        this.setState({
            valueToAdd: ''
        });
    }

    render() {
        return (
            <form className="row mt-3" onSubmit={ this.onSubmitHandler }>
                <div className="col-7">
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="add something..."
                        value={ this.state.valueToAdd }
                        onInput={ this.setValueToAdd }>
                    </input>
                </div>
                <div className="col-5">
                    <button 
                        type="submit" 
                        className="btn btn-primary w-100"
                        >
                        Add to List
                    </button>
                </div>
            </form>
        );
    }
}
