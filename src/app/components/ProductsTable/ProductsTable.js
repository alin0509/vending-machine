import React, { Component } from 'react';

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>code</th>
                <th>Product</th>
                <th>Price</th>
                <th></th>
            </tr>
        </thead>
    )
}
const TableBody = props => {
    const rows = props.productsData.map((row, index) => {
        const url = "img/products/" + row.img;
        const imgs = [];
        for (let i = 0; i < row.noRemaining; i++) {
            imgs.push(<img src={url} key={row.id+i} height="32" width="32" alt={row.name}></img>);
        }

        return (
            <tr key={index}>
                <td>{row.id}</td>
                <td> {imgs} </td>
                <td>{row.price} $</td>
            </tr>
        )
    })

    return <tbody>{rows}</tbody>
}

class ProductsTable extends Component {
    render() {
        const { productsData } = this.props
        return (
            <div>
                <table>
                    <TableHeader />
                    <TableBody productsData={productsData} />
                </table>
            </div>
        )
    }
}

export default ProductsTable