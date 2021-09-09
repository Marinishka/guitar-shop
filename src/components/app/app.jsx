import React from 'react';
import Catalog from '../catalog/catalog';
import Footer from '../footer/footer';
import Header from './../header/header';

function App() {
  return (<>
    <Header/>
    <main className="container">
      <h1 className="visually-hidden">Магазин гитар Guitar shop</h1>
      <Catalog/>
    </main>
    <Footer/>
  </>
  );
}

export default App;
