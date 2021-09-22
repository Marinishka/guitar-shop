import React, {useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {Routes} from '../../const';
import Basket from '../basket/basket';
import Catalog from '../catalog/catalog';
import Footer from '../footer/footer';
import Popup from '../popup/popup';
import Header from './../header/header';

function App() {
  const [popupOpen, setPopupOpen] = useState(null);

  return (<Router>
    <Header/>
    <main className="container main">
      <h1 className="visually-hidden">Магазин гитар Guitar shop</h1>
      <Switch>
        <Route path={Routes.CATALOG} exact render={() => {
          return <Catalog setPopupOpen={setPopupOpen}/>;
        }}/>
        <Route path={Routes.BASKET} exact render={() => {
          return <Basket setPopupOpen={setPopupOpen}/>;
        }}/>
      </Switch>
    </main>
    <Footer/>
    {popupOpen ? <Popup popupOpen={popupOpen} setPopupOpen={setPopupOpen}/> : ``}
  </Router>
  );
}

export default App;
