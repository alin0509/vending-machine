import React, { Component } from 'react'
import './AddCash.scss'

class AddCash extends Component {
    render() {

        const { credit, addCash } = this.props
        return (
            <div className="add-cash-section">
                <span>Add Cash</span><br />
                <button className="add-cash-button" onClick={() => addCash(1)}>1$</button>
                <button className="add-cash-button" onClick={() => addCash(5)}>5$</button>
                <button className="add-cash-button" onClick={() => addCash(10)}>10$</button>
                <br />
                Current credit: {credit}$
            </div>
        );
    }
}

export default AddCash