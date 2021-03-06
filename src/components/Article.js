import React from 'react';
import { Link } from 'react-router-dom';

export default function Article(props) {
    return (
        <article className="card p-3">
            <img className="card-img" src={props.post.image} alt={props.post.title} />
            <div className="card-body">
                <h2 className="card-title">{props.post.title}</h2>
                <p className="card-text"><strong>Category:</strong> {props.post.category}</p>
            </div>
            <div className="card-footer">
                <Link 
                    className="btn"
                    to={{ pathname:`/detail/${props.post.id}`, state: {postToView: props.post} }}
                >View Post</Link>
            </div>
        </article>
    )
}