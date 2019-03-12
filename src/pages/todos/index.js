import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import api from '../../sevices/todoApi';

import './styles.css';

export default class Todos extends Component {
    
    state = {
        loged: true,
        user: {},
        todos: []
    };

    componentDidMount = async () => {
        const userId = localStorage.getItem("userId");
        if (userId === '') {
            this.setState({ logado: false });
        }
        else {
            this.bindData(userId);
        }
    }

    bindData = async (userId) => {
        let user = await api.get(`/users/${userId}`);
        this.setState({ user: user.data });
        let todos = await api.get(`/todos/${userId}`);

        this.setState({ todos: todos.data });
    }

    render() {
        if (this.state.loged === false) {
          return <Redirect to={'/login'} />
        }
        else {
            return (
                <div>
                    <label>Olá, {this.state.user.name}. </label>
                    <Link to={`/login`}>Sair</Link>
                    <ul>
                        {this.state.todos.map(todo => (
                            <li key={todo._id}>
                                <strong>{todo.description}</strong>
                            </li>
                        ))}
                    </ul>
                    <h1>Todos!</h1>
                </div>
            )
        }
    }
}