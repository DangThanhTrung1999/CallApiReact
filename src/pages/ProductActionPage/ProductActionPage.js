import React, {Component} from 'react';
import callApi from "../../utils/apiCaller";
import {Link} from "react-router-dom";

class ProductActionPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: ''
        }
    }

    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            [name]: value
        })
    }
    onSave = (e) => {
        e.preventDefault();
        let {txtName, txtPrice, chkbStatus} = this.state;
        let {history}=this.props;
        callApi('products', 'post', {
            name: txtName,
            price: txtPrice,
            status: chkbStatus
        }).then(res=>{
            history.goBack();
        })
    }

    render() {
        var {txtName, txtPrice, chkbStatus} = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <form onSubmit={this.onSave}>
                    <div className="form-group">
                        <label>Tên sản phẩm</label>
                        <input
                            type="text"
                            className="form-control"
                            name='txtName'
                            value={txtName}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Giá</label>
                        <input
                            type="number"
                            className="form-control"
                            name='txtPrice'
                            value={txtPrice}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái</label>
                    </div>
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name='chkbStatus'
                                value={chkbStatus}
                                onChange={this.onChange}
                            />
                            Còn hàng
                        </label>
                    </div>
                    <Link to={'/product-list'} className='btn btn-danger mr-10'>Hủy</Link>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default ProductActionPage;
