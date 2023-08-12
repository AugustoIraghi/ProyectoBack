// const url = require('url');
import url from 'url';

const urlString = window.location.href;

// Parsear la URL para obtener un objeto con sus componentes
const parsedUrl = url.parse(urlString, true);

// Obtener los parámetros de la URL
const queryParams = parsedUrl.query;

// Acceder a los valores individuales de los parámetros
const cid = queryParams.cid; // 123

console.log(cid, 'linea 15');

fetch('/api/products', {
    method: 'GET',
})
    .then((res) => res.json())
    .then((data) => {
        const products = data.products;
        products.forEach((product) => {
            const addCart = document.getElementById(`addCart${product._id}`);
            addCart.addEventListener('click', async () => {
                await fetch(`/api/carts/${cid}/products/${product._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quantity: 1 }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                        if (data.message == 'Product added successfully') {
                            alert('Product added successfully');
                        }
                    });
            }
            );
        });
    });