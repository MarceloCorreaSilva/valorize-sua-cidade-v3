import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./views/Home";
import Producer from "./views/Producer";
import Structure from "./views/Structure";

import AdminProducer from "./views/Admin/Producer";
import AdminProducerShow from "./views/Admin/Producer/Show";
import AdminProducerCreate from "./views/Admin/Producer/Create";
import AdminProducerTable from "./views/Admin/Producer/Table";

import AdminProduct from "./views/Admin/Product";
import AdminProductCreate from "./views/Admin/Product/Create";

import AdminHighlighter from "./views/Admin/Highlighter";
import AdminHighlighterShow from "./views/Admin/Highlighter/Show";
import AdminHighlighterCreate from "./views/Admin/Highlighter/Create";
import AdminHighlighterTable from "./views/Admin/Highlighter/Table";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin" component={AdminProducer} />

        <Route exact path="/admin/produtores" component={AdminProducer} />
        <Route exact path="/admin/produtores/novo" component={AdminProducerCreate} />
        <Route exact path="/admin/produtores/relatorio" component={AdminProducerTable} />
        <Route exact path="/admin/produtores/:type/novo" component={AdminProducerCreate} />

        <Route exact path="/admin/produtores/:id" component={AdminProducerShow} />
        <Route exact path="/admin/produtores/:id/produtos" component={AdminProduct} />
        <Route exact path="/admin/produtores/:id/produtos/novo" component={AdminProductCreate} />

        <Route exact path="/admin/marcadores" component={AdminHighlighter} />
        <Route exact path="/admin/marcadores/novo" component={AdminHighlighterCreate} />
        <Route exact path="/admin/marcadores/relatorio" component={AdminHighlighterTable} />
        <Route exact path="/admin/marcadores/:type/novo" component={AdminHighlighterCreate} />
        <Route exact path="/admin/marcadores/:id" component={AdminHighlighterShow} />

        {/* <Route exact path="/:code" component={Home} /> */}
        <Route exact path="/produtores/:id" component={Producer} />
        <Route exact path="/estruturas/:id" component={Structure} />

      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
