import React, { Component } from 'react'
import ProductsTable from './components/ProductsTable/ProductsTable'
import Keyboard from './components/KeyBoard/Keyboard'
import AddCash from './components/AddCash/AddCash'
import './App.scss'
import { VendongMachineService } from './VendingMachineService';

class App extends Component {
  vendongMachineService = new VendongMachineService();
  state = {
    products: [],
    credit: 0,
    message: '',
    currentProduct: ''
  }

  buyProduct = id => {
    let { products, credit } = this.state
    const product = products.find(product => product.id === id)
    if (product) {
      if (product.noRemaining && product.price <= credit) {
        this.vendongMachineService.buyProduct(product)
          .then((products) => {
            this.setState({
              products: products,
              currentProduct: '',
              credit: credit - product.price,
              message: '',
            });
          },
            (error) => {
              this.setState({ message: error.message });
            }
          )
      }
      else {
        if (product.price > credit) {
          this.setState({ message: 'No enougth cash! Please add more cash' });

        } else {
          this.setState({ message: 'No more products' });
        }
      }
    }
    else {
      this.setState({ message: 'Wrong product code' });
    }
  }

  addCash = val => {
    const { credit } = this.state
    this.setState({
      credit: credit + val
    })
  }

  createProductCode = val => {
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

  componentDidMount() {
    this.vendongMachineService.getProducts()
      .then((products) => {
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
      <div className="full-container">
        <div className="row">
          <div className="column">
            <ProductsTable productsData={products} />
          </div>
          <div className="column">
            <AddCash addCash={this.addCash} credit={credit} />
            <Keyboard
              currentProduct={currentProduct}
              buyProduct={this.buyProduct}
              createProductCode={this.createProductCode}
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
