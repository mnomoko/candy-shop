import React, { Component } from 'react';
import {Form, Input, Button, Select, Col} from 'antd';
// import {createProduct} from '../../../common/util/APIUtils';

const Option = Select.Option;
const FormItem = Form.Item;
const PRODUCT_NAME_MAX_LENGTH = 30;

class ProductForm extends Component {

    constructor(props) {
        super(props);
        const {categories} = props;

        this.state = {
            id: null,
            name: {
                text: ''
            },
            price: {
                text: ''
            },
            category: null,
            categories: categories,
            isLoading: false,
            formName: this.props.label,
            submitButtonName: this.props.buttonLabel

        };

        this.saveProduct = () => {};
        this.checkProps = this.checkProps.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.saveProduct = this.props.onclick;
        this.checkProps(this.props);
    }

    render() {
        return (
            <div className="new-product-container">
                <h1 className="page-title">{this.state.formName}</h1>
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
                                    className="create-product-form-button">{this.state.submitButtonName}</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    checkProps(props) {
        if(props.product) {
            const {id, name, price, category} = props.product;
            this.setState({
                id: id,
                name: {
                    text: name,
                    ...this.validateName(name)
                },
                price: {
                    text: price,
                    ...this.validateName(price)
                },
                category: category

            });
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const product = {
            id: this.state.id,
            name: this.state.name.text,
            price: this.state.price.text,
            category: this.state.category
        };

        this.saveProduct(product);
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
    };

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
    };

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
}

export default ProductForm;
