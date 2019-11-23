import React, {Component} from 'react';
import {createProduct, getAllCategories} from '../../../common/util/APIUtils';
import {PAGEABLE_LIST_SIZE} from '../../../common/constants';
import './NewProduct.css';
import {Form, Input, Button, Select, Col, notification} from 'antd';
import LoadingIndicator from '../../../common/LoadingIndicator';

const Option = Select.Option;
const FormItem = Form.Item;
const PRODUCT_NAME_MAX_LENGTH = 30;

class NewProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                text: ''
            },
            price: {
                text: ''
            },
            category: null,
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
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
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
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });

    }

    componentDidMount() {
        this.loadCategoryList();
    }

    handleSubmit(event) {
        event.preventDefault();
        const product = {
            id: null,
            name: this.state.name.text,
            price: this.state.price.text,
            category: this.state.category
        };

        createProduct(product)
            .then(response => {
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

    validateName = (nameText) => {
        if (nameText.length === 0) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter product name!'
            }
        } else if (nameText.length > PRODUCT_NAME_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too long (Maximum ${PRODUCT_NAME_MAX_LENGTH} characters allowed)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    validatePrice = (nameText) => {
        if (!nameText.length) {
            return {
                validateStatus: 'error',
                errorMsg: 'Please enter product price!'
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null
            }
        }
    }

    handleNameChange(event) {
        const value = event.target.value;
        this.setState({
            name: {
                text: value,
                ...this.validateName(value)
            }
        });
        console.log('value', value)
    }

    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({
            price: {
                text: value,
                ...this.validatePrice(value)
            }
        });
        console.log('value', value)
    }


    handleCategoryChange(value) {
        const result = this.state.categories.find(c => c.id.toString() === value);
        this.setState({
            category: result
        });
        console.log('result', result)
    }

    isFormInvalid() {
        if (this.state.name.validateStatus !== 'success') {
            return true;
        }

        if (this.state.price.validateStatus !== 'success') {
            return true;
        }

        if (!this.state.category) {
            return true;
        }
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <div className="new-product-container">
                    <h1 className="page-title">Create Product</h1>
                    <div className="new-product-content">
                        <Form onSubmit={this.handleSubmit} className="create-product-form">
                            <FormItem validateStatus={this.state.name.validateStatus}
                                      help={this.state.name.errorMsg} className="product-form-row">
                                <Col xs={24} sm={4}>
                                    Product:
                                </Col>
                                <Col xs={24} sm={20}>
                                    <Input
                                        placeholder={'Product name'}
                                        size="large"
                                        value={this.state.name.text}
                                        onChange={(event) => this.handleNameChange(event)}/>
                                </Col>
                            </FormItem>
                            <FormItem validateStatus={this.state.price.validateStatus}
                                      help={this.state.price.errorMsg} className="product-form-row">
                                <Col xs={24} sm={4}>
                                    Price:
                                </Col>
                                <Col xs={24} sm={20}>
                                    <Input
                                        placeholder={'Product price'}
                                        size="large"
                                        value={this.state.price.text}
                                        onChange={(event) => this.handlePriceChange(event)}/>
                                </Col>
                            </FormItem>
                            <FormItem className="product-form-row">
                                <Col xs={24} sm={4}>
                                    Category:
                                </Col>
                                <Col xs={24} sm={20}>
                                <span style={{marginRight: '18px'}}>
                                    <Select
                                        name="name"
                                        defaultValue="1"
                                        onChange={this.handleCategoryChange}
                                        value={this.state.category ? this.state.category.name : ''}>
                                        {
                                            Array.from(this.state.categories).map(i =>
                                                <Option key={i.id}>{i.name}</Option>
                                            )
                                        }
                                    </Select>
                                </span>
                                </Col>
                            </FormItem>
                            <FormItem className="product-form-row">
                                <Button type="primary"
                                        htmlType="submit"
                                        size="large"
                                        disabled={this.isFormInvalid()}
                                        className="create-product-form-button">Create Product</Button>
                            </FormItem>
                        </Form>
                    </div>
                </div>
            );
        } else
            return <LoadingIndicator/>;
    }
}

export default NewProduct;
