import React, { Component } from 'react';
import { Redirect } from 'react-router';

import './styles.css';

export default class Todos extends Component {
    
    state = {
        logado: true
    };

    componentDidMount = () => {
        const userId = localStorage.getItem("userId");
        if (userId === '') {
            this.setState({ logado: false });
        }
    }

    render() {
        if (this.state.logado === false) {
          return <Redirect to={'/login'} />
        }
        else {
            return <h1>Todos!</h1>
        }
    }
}