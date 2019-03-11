import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import Todos from './pages/todos';
import Cadastro from './pages/cadastro';
// import Main from './pages/main';
// import Product from './pages/product';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/todos" component={Todos} />
            <Route exact path="/singup" component={Cadastro} />
            {/* <Route exact path="/" component={Main} />
            <Route path="/products/:id" component={Product} /> */}
        </Switch>
    </BrowserRouter>
);

export default Routes;