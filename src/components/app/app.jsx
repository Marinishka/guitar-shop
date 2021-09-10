import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Routes} from '../../const';
import Basket from '../basket/basket';
import Catalog from '../catalog/catalog';
import Footer from '../footer/footer';
import Header from './../header/header';

function App() {
  return (<Router>
    <Header/>
    <main className="container">
      <h1 className="visually-hidden">Магазин гитар Guitar shop</h1>
      <Switch>
        <Route path={Routes.CATALOG} exact render={() => {
          return <Catalog/>;
        }}/>
        <Route path={Routes.BASKET} exact render={() => {
          return <Basket/>;
        }}/>
      </Switch>
    </main>
    <Footer/>
  </Router>
  );
}

export default App;
