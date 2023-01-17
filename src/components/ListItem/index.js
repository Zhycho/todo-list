import { Component } from 'react';
import './index.css';

export default class ListItem extends Component {
    render() {
        const { 
            text, isDone, isImportant, 
            onDeleted, onSetedIsDone, onSetedIsImportant 
        } = this.props;

        let classNames = 'list-item';
        
        if (isDone) {
            classNames += ' done';
        }

        if (isImportant) {
            classNames += ' important';
        }
    
        return (
            <div className={ classNames }>
                <span className="list-item-text" onClick={ onSetedIsDone }>
                    { text }
                </span>
                <div className="list-item-controls">
                    <button type="button" className="btn btn-danger" onClick={ onDeleted }>
                        <i className="bi bi-trash"></i>
                    </button>
                    <button type="button" className="btn btn-success" onClick={ onSetedIsImportant }>
                        <i className="bi bi-exclamation-lg"></i>
                    </button>
                </div>
            </div>
        );
    }
}
