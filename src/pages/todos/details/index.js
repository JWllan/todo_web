import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import api from '../../../sevices/todoApi';

import './styles.css';

export default class TodoDetails extends Component {
    state = {
        loged: true,
        todo: {},
        unauthorized: false,
        finalizado: false
    };

    componentDidMount() {
        const { id } = this.props.match.params;

        const userId = localStorage.getItem("userId");
        (userId === '') ? this.logout() : this.bindData(id, userId);
    }

    logout = () => {
        localStorage.setItem("userId", '');
        this.setState({ loged: false });
    }

    bindData = async (id, userId) => {
        let todo = await api.get(`/todos/${id}`);
        if (todo.data.userId === userId) {
            this.setState({ todo: todo.data });
        }
        else {
            this.setState({ unauthorized: true });
        }
    }

    handleSubmit = async (event) => {
        const body = {
            title: this.state.todo.title,
            description: this.state.todo.description,
            userId: this.state.todo.userId
        };

        const response = await api.put(`/todos/${this.state.todo._id}`, body);
        
        if (!response.data) {
            alert("Erro ao tentar encontrar a tarefa.");
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
                    <Link to={`/todos`}>
                        <input type="button" value="Voltar" />
                    </Link>
                    <br />
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