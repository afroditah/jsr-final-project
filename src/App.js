import React, { Component } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc  } from 'firebase/firestore/lite';
import db from './config/firebase-setup';
import { Switch, Route , NavLink} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import './App.css';

const postsCol = collection(db, 'posts');

export default class App extends Component {

  state = {
    posts: []
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
          <NavLink exact to="/">Burger Blog</NavLink>
          <nav>

          </nav>
        </header>
        <main>
          <Switch>
              <Route exact path="/">
                  <Home />
              </Route>
              <Route exact path="/create">
                <CreatePost />
              </Route>
          </Switch>
        </main>
      </div>
    );
  }

}
