import React, {Component} from 'react';
import './Product.css';
import {Avatar} from 'antd';
import {Link} from 'react-router-dom';
import {getAvatarColor} from '../../../common/util/Colors';

class Product extends Component {

    render() {
        return (
            <div className="product-content">
                <div className="product-header">
                    <div className="product-creator-info">
                        <Link className="creator-link" to={`/product/${this.props.product.id}`}>
                            <Avatar className="product-creator-avatar"
                                    style={{backgroundColor: getAvatarColor(this.props.product.category.name)}}>
                                {this.props.product.category.name.toUpperCase()}
                            </Avatar>
                            <span className="product-creator-name">
                                {this.props.product.name}
                            </span>
                        </Link>
                    </div>
                    <div className="product-question">
                        {this.props.product.question}
                    </div>
                </div>
                <div className="product-footer">
                    <span className="total-votes">{this.props.product.category.name}</span>
                    <span className="separator">•</span>
                    <span className="time-left">{this.props.product.price} €</span>
                </div>
            </div>
        );
    }
}


export default Product;
