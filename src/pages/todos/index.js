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
        (userId === '') ? this.logout() : this.bindData(userId);
    }

    logout = () => {
        localStorage.setItem("userId", '');
        this.setState({ logado: false });
    }

    bindData = async (userId) => {
        let user = await api.get(`/users/${userId}`);
        this.setState({ user: user.data });
        let todos = await api.get(`/todos?userId=${userId}`);

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
                    <input type="button" onClick={this.logout} value="Sair" />
                    <ul>
                        {this.state.todos.map(todo => (
                            <li key={todo._id}>
                                <Link to={`/todo-details/${todo._id}`}>
                                    <strong>{todo.description} </strong>
                                </Link>
                                <input type="button" onClick={this.logout} value="Excluir" />
                            </li>
                        ))}
                    </ul>
                </div>
            )
        }
    }
}