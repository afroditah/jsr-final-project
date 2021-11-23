import React, { Component } from 'react';

export default class CreatePost extends Component {
    state = {
        postData: {
            title: '',
            category: '',
            image: '',
            excerpt: '',
        }
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
        this.props.createPost(this.state.postData);
    }

    render() {
        return (
            <div>
                <h1>Create New Post</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Post Title</label>
                        <input
                            className="form-control"
                            value={this.state.postData.title}
                            onChange={this.handleChange}
                            name="title"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input
                            className="form-control"
                            value={this.state.postData.category}
                            onChange={this.handleChange}
                            name="category"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Image URL</label>
                        <input
                            className="form-control"
                            value={this.state.postData.image}
                            onChange={this.handleChange}
                            name="image"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Excerpt</label>
                        <textarea
                            className="form-control"
                            value={this.state.postData.excerpt}
                            onChange={this.handleChange}
                            name="excerpt"
                            required
                        />
                    </div>
                    <button type="submit" className="btn">Create Post</button>
                </form>
            </div>
        );
    }
}