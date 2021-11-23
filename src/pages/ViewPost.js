import React from 'react';
import { Link } from 'react-router-dom';

export default function ViewPost(props) {

    const { postToView } = props.location.state;

    return (
        <article className="single-post card p-3">
            <header>
                <h2 className="card-title">{postToView.title}</h2>
            </header>
            <div className="card-body">
                <img className="card-img" src={postToView.image} alt={postToView.title} />
                <p className="card-text">{postToView.excerpt}</p>
                <p className="card-text"><strong>Category:</strong> {postToView.category}</p>
            </div>
            <div className="card-footer">
                {
                    props.user
                    ? (
                        <>
                            <Link 
                                className="btn btn-outline"
                                to={{ pathname:`/edit/${postToView.id}`, state: {postToEdit: postToView} }}
                            ><span className="material-icons">edit</span> Edit</Link>
                            <button 
                                onClick={() => props.deletePost(postToView.id)} 
                                className="btn btn-outline"><span className="material-icons">clear</span> Delete</button>
                        </>
                    )
                    : (
                        <p><a href="/login">Log in to edit post</a></p>
                    )
                }
            </div>
        </article>
    );
}