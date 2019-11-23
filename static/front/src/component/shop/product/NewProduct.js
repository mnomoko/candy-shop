import React, {Component} from 'react';
import {createProduct, getAllCategories} from '../../../common/util/APIUtils';
import {PAGEABLE_LIST_SIZE} from '../../../common/constants';
import './NewProduct.css';
import {notification} from 'antd';
import LoadingIndicator from '../../../common/LoadingIndicator';
import ProductForm from './ProductForm';

class NewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            currentVotes: [],
            isLoading: false
        };
        this.loadCategoryList = this.loadCategoryList.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                    page: response.page.number,
                    size: response.page.size,
                    totalElements: response.page.totalElements,
                    totalPages: response.page.totalPages,
                    last: response.page.totalPages,
                    isLoading: false
                })
            }).catch(() => {
            this.setState({
                isLoading: false
            })
        });

    }

    componentDidMount() {
        this.loadCategoryList();
    }

    handleSubmit(product) {
        product.id = null;
        createProduct(product)
            .then(() => {
                this.props.history.push("/");
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

    render() {
        const {isLoading, categories} = this.state;
        if(!isLoading && categories) {
            return (<ProductForm history={this.props.history} label={'Create product'} buttonLabel={'Create'} categories={categories} onclick={this.handleSubmit}/>)
        }
        else
            return <LoadingIndicator/>
    }
}

export default NewProduct;
