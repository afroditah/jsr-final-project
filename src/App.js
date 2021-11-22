import React, { Component } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc  } from 'firebase/firestore/lite';
import db from './config/firebase-setup';
import { Switch, Route , NavLink} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import ViewPost from './pages/ViewPost';
import './App.css';

const postsCol = collection(db, 'posts');

export default class App extends Component {

  state = {
    posts: []
  }

  createPost = async newPost => {
    await addDoc(postsCol, newPost);

    this.props.history.push('/');

    this.readPosts();
  }

  deletePost = async id => {
    const postDoc = doc(postsCol, id);

    await deleteDoc(postDoc);

    this.props.history.push('/');

    this.readPosts();
  }

  updatePost = async editedPost => {
    const postDoc = doc(postsCol, editedPost.id);

    await setDoc(postDoc, editedPost);

    this.props.history.push('/');

    this.readPosts();
  }

  readPosts = async () => {
    const postsSnapshot = await getDocs(postsCol);

    const postsData = [];

    postsSnapshot.forEach(doc => {
      postsData.push({
        id: doc.id,
        title: doc.data().title,
        category: doc.data().category,
        image: doc.data().image,
        excerpt: doc.data().excerpt,
      });
    });

    this.setState({
      posts: postsData
    });
  }

  componentDidMount() {
    this.readPosts();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavLink exact to="/">
            <span className="material-icons">lunch_dining</span>Home
          </NavLink>
          <nav>
            <NavLink exact to="/create">
              <span className="material-icons">add_circle</span>Create Post
            </NavLink>
          </nav>
        </header>
        <main>
          <Switch>
              <Route exact path="/">
                  <Home
                    postList={this.state.posts}
                    deletePost={this.deletePost} 
                  />
              </Route>
              <Route exact path="/create">
                <CreatePost createPost={this.createPost} />
              </Route>
              <Route path="/edit" render={ ({ location }) =>
                <EditPost 
                    updatePost={this.updatePost}
                    location={location} />
                } />
              <Route path="/detail" render={ ({ location }) =>
                <ViewPost
                  deletePost={this.deletePost}
                  location={location} />
                } />
          </Switch>
        </main>
        <footer>
            <p>
              ✶✶✶✶<br />
              Made in Chicago
            </p>
        </footer>
      </div>
    );
  }

}
