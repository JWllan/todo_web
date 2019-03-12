import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import api from '../../sevices/todoApi';

import './styles.css';

export default class Login extends Component {
    componentDidMount = () => {
        localStorage.setItem("userId", '');
    }

    state = {
        login: "",
        senha: "",
        usuarioId: "",
        logado: false
    };

    handleSubmit = async (event) => {
        const body = {login: this.state.login, senha: this.state.senha};
        const response = await api.post('/login', body);
        
        if (!response.data) {
            this.setState({ logado: false });
            alert("Usuário e senha inválidos!");
        }
        else {
            await localStorage.setItem("userId", response.data._id);

            this.setState({ logado: true, usuarioId: response.data._id });
        }
    }

    render() {
        if (this.state.logado === true) {
          return <Redirect to={`/todos`} />
        }
        else {
            return (
                <div>
                    <form>
                        <input type="text" onChange={this.onChange_login} value={this.state.login} placeholder="Login" />
                        <br />
                        <input type="password" onChange={this.onChange_senha} value={this.state.senha} placeholder="Senha" />
                        <br />
                        <input type="button" onClick={this.handleSubmit} value="Entrar" />
                        <br />
                        <Link to={`/singup`}>Cadastrar-me</Link>
                    </form>
                </div>
            );
        }
    }

    //#region eventos
    onChange_login = (event) => {
        this.setState({login: event.target.value});
    }

    onChange_senha = (event) => {
        this.setState({senha: event.target.value});
    }
    //#endregion
}