import React, {Component} from 'react';
import {getAllProducts} from '../../../common/util/APIUtils';
import Product from './Product';
import LoadingIndicator from '../../../common/LoadingIndicator';
import {Button, Icon} from 'antd';
import {PAGEABLE_LIST_SIZE} from '../../../common/constants';
import {withRouter} from 'react-router-dom';
import './ProductList.css';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            page: 0,
            size: 10,
            totalElements: 0,
            totalPages: 0,
            last: true,
            currentVotes: [],
            isLoading: false
        };
        this.loadProductList = this.loadProductList.bind(this);
        this.handleLoadMore = this.handleLoadMore.bind(this);
    }

    loadProductList(page = 0, size = PAGEABLE_LIST_SIZE) {
        let promise;
        promise = getAllProducts(page, size);

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                const currentVotes = this.state.currentVotes.slice();

                this.setState({
                    products: response._embedded.products,
                    page: response.page.number,
                    size: response.page.size,
                    totalElements: response.page.totalElements,
                    totalPages: response.page.totalPages,
                    last: response.page.totalPages,
                    currentVotes: currentVotes.concat(Array(response._embedded.products.length).fill(null)),
                    isLoading: false
                })
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });

    }

    componentDidMount() {
        this.loadProductList();
    }

    componentDidUpdate(nextProps) {
        if (this.props.isAuthenticated !== nextProps.isAuthenticated) {
            // Reset State
            this.setState({
                products: [],
                page: 0,
                size: 10,
                totalElements: 0,
                totalPages: 0,
                last: true,
                currentVotes: [],
                isLoading: false
            });
            this.loadProductList();
        }
    }

    handleLoadMore() {
        this.loadProductList(this.state.page + 1);
    }

    render() {
        const productViews = [];
        this.state.products.forEach((product) => {
            productViews.push(<Product
                key={product.id}
                product={product}/>)
        });

        return (
            <div className="products-container">
                {productViews}
                {
                    !this.state.isLoading && this.state.products.length === 0 ? (
                        <div className="no-products-found">
                            <span>No Products Found.</span>
                        </div>
                    ) : null
                }
                {
                    !this.state.isLoading && !this.state.last ? (
                        <div className="load-more-products">
                            <Button type="dashed" onClick={this.handleLoadMore} disabled={this.state.isLoading}>
                                <Icon type="plus"/> Load more
                            </Button>
                        </div>) : null
                }
                {
                    this.state.isLoading ?
                        <LoadingIndicator/> : null
                }
            </div>
        );
    }
}

export default withRouter(ProductList);
