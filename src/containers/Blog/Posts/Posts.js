import React, { Component } from 'react';
import axiosInstance from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import { Route } from 'react-router-dom';
import FullPost from '../FullPost/FullPost'

class Posts extends Component {

    state = {
        posts: [],
    };

    componentDidMount() {
        axiosInstance.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatePost = posts.map(post => {
                    return {
                        ...post,
                        author: 'Anuj'
                    }
                });
                this.setState({posts: updatePost});
            })
            .catch(error => {
                //this.setState({error: true});
            });
    };

    postSelected = (id) => {
        this.props.history.push({pathname: '/posts/' + id});
    };

    render() {

        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    //<Link to={'/posts/' + post.id} key={post.id}>
                        <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelected(post.id)}
                        />
                    //</Link>
                )
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
            </div>
        );
    }
}
export default Posts;