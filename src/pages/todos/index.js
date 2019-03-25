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
        this.setState({ loged: false });
    }

    bindData = async (userId) => {
        let user = await api.get(`/users/${userId}`);
        this.setState({ user: user.data });
        let todos = await api.get(`/todos?userId=${userId}`);

        this.setState({ todos: todos.data });
    }

    deleteTodo = async (id) => {
        let userId = localStorage.getItem("userId");
        let todo = await api.get(`/todos/${id}`);
        if (todo.data.userId === userId) {
            await api.delete(`/todos/${id}`);
            this.bindData(userId);
        }
        else {
            alert("Não autorizado");
        }
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
                                    <strong>{todo.title} </strong>
                                    <br />
                                    <label>{todo.description} </label>
                                </Link>
                                <input type="button" onClick={() => this.deleteTodo(todo._id)} value="Excluir" />
                            </li>
                        ))}
                    </ul>
                    <br />
                    <Link to={`/todo-create`}>
                        <input type="button" value="Adicionar" />
                    </Link>
                </div>
            )
        }
    }
}