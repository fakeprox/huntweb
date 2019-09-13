import React, { Component } from 'react';
import api from '../../services/api';
import './style.css';
import {Link} from 'react-router-dom';
export default class Main extends Component {

    state = { // objeto.
        products: [], // products é um array.
        procutcInfo: {},
        page: 1,
    }
    componentDidMount() { // assim que o componente for exibido em tela. 
        this.loadProducts();
    }

    loadProducts = async (page=1) => { // assincrono não espera resultado
        const response = await api.get(`/products?page=${page}`); 
        const  {docs, ...productInfo} = response.data;
        this.setState({ products: docs, productInfo, page });
    }; // arrow function -> sempre ao criar nossas funções.

    prevPage = () =>{
        const {page, productInfo} = this.state;
        if(page === 1) return;

        const pageNumber = page - 1;
        this.loadProducts(pageNumber);
    }
    nextPage = () => {
        const{ page, productInfo } = this.state;
        if(page === productInfo.pages) return;
        const pageNumber = page + 1;
        this.loadProducts(pageNumber);
    }

    render() { // render ele escuta e executa o que for solicitado 
        const {products,page, productInfo} = this.state;
        return (
            <div className="product-list">
                {products.map(product => ( //map percorre
                    <article key={product._id}>
                        <strong id="title-product">{product.title}</strong>
                        <p>{product.description}</p>
                        <Link to={`/products/${product._id}`}>Acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={page === 1} onClick={this.prevPage}>Anterior</button>
                    <button onClick={this.nextPage}>Próxima</button>
                </div>
            </div>
        )
    }
}