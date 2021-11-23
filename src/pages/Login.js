import React from 'react';

export default class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.login(this.state);
    }

    render() {
        return (
            <div>
                <h1>Log In</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            placeholder="Email" 
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Password" 
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn">Log In</button>
                        <p>Don't have an account? <a href="/register">Sign Up</a></p>
                    </div>
                </form>
            </div>
        );
    }
}