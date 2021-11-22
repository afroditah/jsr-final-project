import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class EditPost extends Component {
    state= {
        postData: this.props.location.state.postToEdit
    }

    handleChange = e => {
        this.setState({
            postData: {
                ...this.state.postData,
                [e.target.name]: e.target.value
            }
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.updatePost(this.state.postData);
    }

    render() {
        return (
            <div>
                <h1>Edit Post</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Post Title</label>
                        <input
                            className="form-control"
                            value={this.state.postData.title}
                            onChange={this.handleChange}
                            name="title"
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input
                            className="form-control"
                            value={this.state.postData.category}
                            onChange={this.handleChange}
                            name="category"
                        />
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input
                            className="form-control"
                            value={this.state.postData.image}
                            onChange={this.handleChange}
                            name="image"
                        />
                    </div>
                    <div className="form-group">
                        <label>Excerpt</label>
                        <textarea
                            className="form-control"
                            value={this.state.postData.excerpt}
                            onChange={this.handleChange}
                            name="excerpt"
                        />
                    </div>
                    <button type="submit" className="btn">Update Post</button>
                    <Link className="btn btn-outline" to='/'>Cancel</Link>
                </form>
            </div>
        );
    }
}