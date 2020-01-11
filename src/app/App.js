import React, { Component } from 'react'
import ProductsTable from './components/ProductsTable/ProductsTable'
import Keyboard from './components/KeyBoard/Keyboard'
import AddCash from './components/AddCash/AddCash'
import './App.scss'

class App extends Component {
    state = {
        products: [
            {
                id: '11',
                name: 'Coca Cola',
                price: '5',
                noRemaining: '2',
                maxAllowed: '4',
                img: 'coca-cola.jpg'
            },
            {
                id: '12',
                name: 'Pepsi Cola',
                price: '5',
                noRemaining: '3',
                maxAllowed: '4',
                img: 'pepsi.jpg'
            },
            {
                id: '13',
                name: 'Fanta',
                price: '5',
                noRemaining: '1',
                maxAllowed: '4',
                img: 'fanta.jpg'
            },
            {
                id: '14',
                name: 'Prigat',
                price: '5',
                noRemaining: '3',
                maxAllowed: '4',
                img: 'prigat.jpg'
            },
            {
                id: '15',
                name: 'Coca Cola',
                price: '5',
                noRemaining: '2',
                maxAllowed: '4',
                img: 'cola-cherry.jpg'
            },
            {
                id: '21',
                name: '7days',
                price: '3',
                noRemaining: '3',
                maxAllowed: '4',
                img: '7days.png'
            },
            {
                id: '22',
                name: 'Kit kat',
                price: '2',
                noRemaining: '1',
                maxAllowed: '4',
                img: 'kit-kat.jpg'
            },
            {
                id: '23',
                name: 'Mars',
                price: '2.5',
                noRemaining: '3',
                maxAllowed: '4',
                img: 'mars.jpg'
            },
            {
                id: '24',
                name: 'Snickers',
                price: '2.5',
                noRemaining: '3',
                maxAllowed: '4',
                img: 'snickers.jpeg'
            },
            {
                id: '25',
                name: 'Orbit',
                price: '2.5',
                noRemaining: '2',
                maxAllowed: '4',
                img: 'orbit.jpg'
            },

        ],
        credit: 0,
        message: '',
        currentProduct: ''
    }

    removeProduct = id => {
        let { products, credit } = this.state
        const currentProduct = products.find(product => product.id === id)
        if (currentProduct) {
            if (currentProduct.noRemaining && currentProduct.price <= credit) {
                this.setState({
                    products: products.map((product, i) => {
                        if (product.id === id) {
                            product.noRemaining -= 1;
                        }
                        return product;
                    }),
                    currentProduct: '',
                    credit: credit - currentProduct.price,
                    message: '',
                })
            }
            else {
                if (currentProduct.price > credit) {
                    this.setState({
                        message: 'No enougth cash! Please add more cash'
                    })
                } else {
                    this.setState({
                        message: 'No more products'
                    })
                }
                setTimeout(() => {
                    this.setState({ message: '' });
                }, 2000)
            }
        }
        else {
            this.setState({
                message: 'Wrong product code'
            })
        }
    }

    addCash = val => {
        const { credit } = this.state
        this.setState({
            credit: credit + val
        })
    }

    createProduct = val => {
        const { currentProduct } = this.state
        this.setState({
            currentProduct: currentProduct + val
        })
    }
    del = val => {
        const { currentProduct } = this.state
        this.setState({
            currentProduct: currentProduct.slice(0, -1)
        })
    }

    buyProduct = val => {
        this.removeProduct(val);
    }

    render() {
        const { products, message, credit, currentProduct } = this.state

        return (
            <div className="full-container ">
                <div className="row">
                    <div className="column ">
                        <ProductsTable
                            productsData={products} />

                    </div>
                    <div className="column ">
                        <AddCash
                            addCash={this.addCash}
                            credit={credit} />
                        <Keyboard
                            currentProduct={currentProduct}
                            buyProduct={this.buyProduct}
                            createProduct={this.createProduct}
                            del={this.del}
                            message={message}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default App
