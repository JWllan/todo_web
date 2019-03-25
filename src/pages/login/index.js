import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import api from '../../sevices/todoApi';

import './styles.scss';

export default class Login extends Component {
    componentDidMount = () => {
        const userId = localStorage.getItem("userId");
        if (userId !== '') {
            this.setState({ logado: true });
        }
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
                <div className="main-login">
                    <form>
                        <div className="inputs">
                            <input type="text" onChange={this.onChange_login} value={this.state.login} placeholder="Login" />
                            <span></span>
                        </div>
                        <div className="inputs">
                            <input type="password" onChange={this.onChange_senha} value={this.state.senha} placeholder="Senha" />
                            <span></span>
                        </div>
                        <div className="buttons">
                            <button onClick={this.handleSubmit}>Entrar</button>
                        </div>
                        <div>
                            <Link to={`/singup`}>Cadastrar-me</Link>
                        </div>
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