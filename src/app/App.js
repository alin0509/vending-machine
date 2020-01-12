import React, { Component } from 'react'
import ProductsTable from './components/ProductsTable/ProductsTable'
import Keyboard from './components/KeyBoard/Keyboard'
import AddCash from './components/AddCash/AddCash'
import './App.scss'

class App extends Component {
    state = {
        products:[],
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

    componentDidMount() {
        fetch("http://localhost:3100/products")
            .then(res => res.json())
            .then(
                (products) => {
                    this.setState({
                        products: products
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
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
