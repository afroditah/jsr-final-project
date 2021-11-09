import React, { Component } from 'react';

export default class CreatePost extends Component {
    state = {
        formData: {
            id: '',
            title: '',
            category: '',
            image: '',
            excerpt: '',
        }
    }

    handleChange() {
        
    }

    handleSubmit = e => {
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Publish New Post</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Post Title</label>
                        <input
                            className="form-control"
                            value={this.state.formData.title}
                            onChange={this.handleChange}
                            name="title"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-info"
                    >Create Post</button>
                </form>
            </div>
        );
    }
}