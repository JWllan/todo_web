import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import api from '../../sevices/todoApi';

import './styles.css';

export default class Cadastro extends Component {
    state = {
        name: "",
        surname: "",
        nickname: "",
        password: "",
        age: 0,
        gender: "",
        finalizado: false
    };

    handleSubmit = async (event) => {
        const body = {
            name: this.state.name,
            surname: this.state.surname,
            nickname: this.state.nickname,
            password: this.state.password,
            age: this.state.age,
            gender: this.state.gender,
        };

        const response = await api.post('/users', body);
        
        if (!response.data) {
            alert("Login já existe");
        }
        else {
            await localStorage.setItem("userId", response.data._id);
            alert("Criado com sucesso");

            this.setState({ finalizado: true });
        }
    }

    render() {
        if (this.state.finalizado === true) {
          return <Redirect to={`/todos`} />
        }
        else {
            return (
                <div>
                    <Link to={`/login`}>Voltar</Link>
                    <form>
                        <input type="text" onChange={this.onChange_name} value={this.state.name} placeholder="Nome" />
                        <br />
                        <input type="text" onChange={this.onChange_surname} value={this.state.surname} placeholder="Sobrenome" />
                        <br />
                        <input type="text" onChange={this.onChange_nickname} value={this.state.nickname} placeholder="Login" />
                        <br />
                        <input type="password" onChange={this.onChange_password} value={this.state.password} placeholder="Senha" />
                        <br />
                        <input type="button" onClick={this.handleSubmit} value="Salvar" />
                        <br />
                        <Link to={`/singup`}>Cadastrar-me</Link>
                    </form>
                    <h1>Cadastro!</h1>
                </div>
            )
        }
    }

    //#region eventos
    onChange_name = (event) => {
        this.setState({name: event.target.value});
    }

    onChange_surname = (event) => {
        this.setState({surname: event.target.value});
    }

    onChange_nickname = (event) => {
        this.setState({nickname: event.target.value});
    }

    onChange_password = (event) => {
        this.setState({password: event.target.value});
    }
    //#endregion
}