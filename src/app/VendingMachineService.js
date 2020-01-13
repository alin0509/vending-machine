export class VendongMachineService {
	httpHeaders = {
		Accept: 'application/json',
		'Content-Type': 'application/json',
	}

	getProducts() {
		return fetch("http://localhost:3100/products").then(res => res.json())
	};

	buyProduct(product) {
		return fetch('http://localhost:3100/product', {
			method: 'POST',
			headers: this.httpHeaders,
			body: JSON.stringify({ product }),
		}).then(res => res.json())
	}
}
