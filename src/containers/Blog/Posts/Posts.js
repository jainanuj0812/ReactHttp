import React, { Component } from 'react';
import axiosInstance from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';

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
        this.setState({selectedPostId: id});
    };

    render() {

        let posts = <p style={{textAlign: 'center'}}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelected(post.id)}
                />
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        );
    }
}
export default Posts;