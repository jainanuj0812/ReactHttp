import React, { Component } from 'react';
import './Blog.css';
import Posts from './Posts/Posts';
import { Route, NavLink, Switch, Redirect }from 'react-router-dom';
// import NewPost from '../Blog/NewPost/NewPost';
import ayncComponent from '../../hoc/asyncComponent';

const AsyncNewComponent = ayncComponent(() => {
    return import('../Blog/NewPost/NewPost');
});


class Blog extends Component {

    state = {
        auth: true
    };

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink to="/posts" exact>Posts</NavLink></li>  {/*default add active class to override sue activeClassName, activeStyle*/}
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/*<Route path="/" exact render={() => <h1>Home</h1>}/>
                 <Route path="/" render={() => <h1>Home 2</h1>}/>*/}
                <Switch>
                    {this.state.auth ? <Route path="/new-post" exact component={AsyncNewComponent}/>: null}
                    <Route path="/posts" component={Posts}/>
                    <Route render={() => <h1>Not Found</h1>} />
                    {/*<Route path="/" component={Posts}/>*/}
                    {/*<Redirect from="/" to="/posts"/>*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;