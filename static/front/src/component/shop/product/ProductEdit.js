import React, { Component } from 'react';
import ProductForm from './ProductForm';
import {updateProduct, getAllCategories, getProductById} from '../../../common/util/APIUtils';
import {notification} from 'antd';
import LoadingIndicator from '../../../common/LoadingIndicator';
import {PAGEABLE_LIST_SIZE} from '../../../common/constants';

class ProductEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productId: this.props.match.params.id,
            product: null
        };
        this.loadProduct = this.loadProduct.bind(this);
        this.loadCategoryList = this.loadCategoryList.bind(this);
    }

    componentDidMount() {
        this.loadProduct();
        this.loadCategoryList();
    }

    loadProduct() {
        let promise;
        promise = getProductById(this.state.productId);

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                this.setState({
                    product: response,
                    isLoading: false
                })
            }).catch(() => {
            this.setState({
                isLoading: false
            })
        });

    }

    loadCategoryList(page = 0, size = PAGEABLE_LIST_SIZE) {
        let promise = getAllCategories(page, size);

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                this.setState({
                    categories: response._embedded.categories,
                    isLoading: false
                })
            }).catch(() => {
            this.setState({
                isLoading: false
            })
        });

    }

    render() {
        const {isLoading, product, categories} = this.state;
        if(!isLoading && product && categories) {
            return (<ProductForm history={this.props.history} product={product} label={'Edit product'} buttonLabel={'Update'} categories={categories} onclick={this.handleSubmit}/>)
        }
        else
            return <LoadingIndicator/>
    }

    handleSubmit(product) {
        updateProduct(product)
            .then(() => {
                this.props.history.push('/');
            }).catch(error => {
            if (error.status === 401) {
                this.props.handleLogout('/login', 'error', 'You have been logged out. Please login create product.');
            } else {
                notification.error({
                    message: 'Candy Shop',
                    description: error.message || 'Sorry! Something went wrong. Please try again!'
                });
            }
        });
    }
}

export default ProductEdit;
