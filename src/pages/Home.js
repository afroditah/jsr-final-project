import React from 'react';
import Article from '../components/Article';

export default function Home(props) {
    return (
        <>
            <div className='homepage'>
                <h1>Burger Times</h1>
                <p>The quest for the best (burger)</p>
            </div>
            <div className='posts-grid'>
                {props.postList.map(post => 
                    <Article
                        key={post.id}
                        post={post}
                        deletePost={props.deletePost}
                    />
                )}
            </div>
        </>
    )
}