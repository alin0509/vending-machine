import React, { Component } from 'react'
import './Keyboard.scss'

class Keyboard extends Component {
    render() {
        const { currentProduct, buyProduct, createProduct, del, message } = this.props;
        return (
            <div className="keyboard-section">
                <section>Product code: {currentProduct}</section>
                <section >
                    <button className="button keyboard-button" onClick={() => createProduct(1)}> 1 </button>
                    <button className="button keyboard-button" onClick={() => createProduct(2)}> 2 </button>
                    <button className="button keyboard-button" onClick={() => createProduct(3)}> 3 </button>
                </section>
                <section>
                    <button className="button keyboard-button" onClick={() => createProduct(4)}> 4 </button>
                    <button className="button keyboard-button" onClick={() => createProduct(5)}> 5 </button>
                    <button className="button keyboard-button" onClick={() => createProduct(6)}> 6 </button>
                </section>
                <section>
                    <button className="button keyboard-button" onClick={() => createProduct(7)}> 7 </button>
                    <button className="button keyboard-button" onClick={() => createProduct(8)}> 8 </button>
                    <button className="button keyboard-button" onClick={() => createProduct(9)}> 9 </button>
                </section>
                <section>
                    <button className="button keyboard-button" onClick={() => del()}>{'<'}</button>
                    <button className="button keyboard-button" onClick={() => createProduct(0)}> 0 </button>
                    <button className="button keyboard-button" onClick={() => buyProduct(currentProduct)} >buy</button>
                </section>
                <section> {message} </section>
            </div>

        );
    }
}

export default Keyboard