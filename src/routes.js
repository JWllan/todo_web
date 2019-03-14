import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import Todos from './pages/todos';
import Cadastro from './pages/cadastro';
import TodoDetails from './pages/todos/details';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/todos" component={Todos} />
            <Route exact path="/singup" component={Cadastro} />
            <Route exact path="/todo-details/:id" component={TodoDetails} />
        </Switch>
    </BrowserRouter>
);

export default Routes;