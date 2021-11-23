import React, { Component } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc, addDoc  } from 'firebase/firestore/lite';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import db from './config/firebase-setup';
import { Switch, Route , NavLink, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import ViewPost from './pages/ViewPost';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

const postsCol = collection(db, 'posts');

export default class App extends Component {

  state = {
    posts: [],
    user: null
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

  login = async existingUser => {
    try {
      const auth = getAuth();

      const data = await signInWithEmailAndPassword(
        auth,
        existingUser.email,
        existingUser.password
      );

      this.setState({
        user: data.user
      }, 
        () => this.props.history.push('/')
      );
    } catch (error) {
      console.log('err', error);
    }
  }

  logout = () => {
    const auth = getAuth();

    signOut(auth)
      .then(() => {
        this.setState({
          user: null,
        },
          () => this.props.history.push('/')
        );
      })
      .catch((error) => {
        console.log('err', error);
      });
  }

  register = async newUser => {
    try {
      const auth = getAuth();

      const data = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      this.setState({
        user: data.user
      },
        () => this.props.history.push('/')
      );
    } catch (error) {
      console.log('err', error);
    }
  }

  componentDidMount() {
    this.readPosts();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <NavLink exact to="/">
            <span className="material-icons">lunch_dining</span> Burger Times
          </NavLink>
          <nav>
            {
              this.state.user 
              ? (
                <>
                  <NavLink exact to='/create'>
                    <span className="material-icons">add_circle</span> Create Post
                  </NavLink>
                  <NavLink exact to='/logout'>
                    <span className="material-icons">logout</span> Log Out
                  </NavLink>
                </>
              ) 
              : (
                <NavLink exact to='/login'>
                  <span className="material-icons">account_circle</span> Log In
                </NavLink>
              )
            }
          </nav>
        </header>
        <main>
          <Switch>
              <Route exact path='/'>
                  <Home
                    postList={this.state.posts}
                    deletePost={this.deletePost} 
                  />
              </Route>
              <Route exact path='/login'>
                <Login login={this.login} />
              </Route>
              <Route exact path='/register'>
                <Register register={this.register} />
              </Route>
              <Route exact path='/logout' render={() => this.logout()} />
              <Route exact path='/create'>
                {
                  this.state.user 
                  ? <CreatePost createPost={this.createPost} />
                  : <Redirect to={{ pathname: '/login'}} />
                }
              </Route>
              <Route path='/edit' render={ ({ location }) => 
                {
                  this.state.user
                  ? <EditPost 
                      updatePost={this.updatePost}
                      location={location} />
                  : this.props.history.push('/login')
                }
              } />
              <Route path='/detail' render={ ({ location }) =>
                <ViewPost
                  deletePost={this.deletePost}
                  location={location} />
              } />
              <Route path='*'>
                <h1>404</h1>
              </Route>
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
