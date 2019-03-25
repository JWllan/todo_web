import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import api from '../../../sevices/todoApi';

import './styles.css';

export default class TodoCreate extends Component {
    state = {
        loged: true,
        todo: {
            title: '',
            description: '',
            userId: 0
        },
        unauthorized: false,
        finalizado: false
    };

    componentDidMount() {
        const userId = localStorage.getItem("userId");
        if (userId === '') { this.logout(); }
        else {
            let todo = this.state.todo;
            todo.userId = userId;
            this.setState({ todo: todo });
        }
    }

    logout = () => {
        localStorage.setItem("userId", '');
        this.setState({ loged: false });
    }

    handleSubmit = async (event) => {
        const body = {
            title: this.state.todo.title,
            description: this.state.todo.description,
            userId: this.state.todo.userId
        };

        const response = await api.post(`/todos`, body);
        
        if (!response.data) {
            alert("Erro ao tentar adicionar a tarefa.");
        }
        else {
            this.setState({ finalizado: true });
        }
    }

    render() {
        if (!this.state.loged) {
            return <Redirect to={'/login'} />
        }
        else if (this.state.unauthorized) {
            return (
                <div>
                    <Link to={`/todos`}>Não autorizado! Voltar.</Link>
                </div>
            )
        }
        else if (this.state.finalizado) {
            return <Redirect to={'/todos'} />
        }
        else {
            return (
                <div>
                    <label>
                        Título:
                        <textarea onChange={this.onChange_title} value={this.state.todo.title} />
                    </label>
                    <br />
                    <label>
                        Descrição:
                        <textarea onChange={this.onChange_description} value={this.state.todo.description} />
                    </label>
                    <br />
                    <input type="button" onClick={this.handleSubmit} value="Salvar" />
                </div>
            )
        }
    }

    //#region eventos
    onChange_title = (event) => {
        let todo = this.state.todo;
        todo.title = event.target.value;
        this.setState({ todo: todo });
    }

    onChange_description = (event) => {
        let todo = this.state.todo;
        todo.description = event.target.value;
        this.setState({ todo: todo });
    }
    //#endregion
}