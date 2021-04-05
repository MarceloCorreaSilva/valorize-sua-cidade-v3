import React, { useEffect } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Admin: React.FC<LayoutProps> = ({ children }) => {
  useEffect(() => {
    const body = document.body;
    body.classList.add("hold-transition", "sidebar-mini", "layout-fixed");
  }, []);

  useEffect(() => {
    const fontawesome = document.createElement("link");
    fontawesome.rel = "stylesheet";
    fontawesome.href = `${process.env.PUBLIC_URL}/assets/adminlte/plugins/fontawesome-free/css/all.min.css`;

    const overlayScrollbars = document.createElement("link");
    overlayScrollbars.rel = "stylesheet";
    overlayScrollbars.href = `${process.env.PUBLIC_URL}/assets/adminlte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css`;

    const adminlte = document.createElement("link");
    adminlte.rel = "stylesheet";
    adminlte.href = `${process.env.PUBLIC_URL}/assets/adminlte/dist/css/adminlte.min.css`;

    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href =
      "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700";

    document.head.appendChild(fontawesome);
    document.head.appendChild(overlayScrollbars);
    document.head.appendChild(adminlte);
    document.head.appendChild(font);
  }, []);

  useEffect(() => {
    // const jquery = document.createElement("script");
    // jquery.src = `${process.env.PUBLIC_URL}/assets/adminlte/plugins/jquery/jquery.min.js`;
    // jquery.async = true;
    // const bootstrap = document.createElement("script");
    // bootstrap.src = `${process.env.PUBLIC_URL}/assets/adminlte/plugins/bootstrap/js/bootstrap.bundle.min.js`;
    // bootstrap.async = true;
    // const overlayScrollbars = document.createElement("script");
    // overlayScrollbars.src = `${process.env.PUBLIC_URL}/assets/adminlte/plugins/overlayScrollbars/js/jquery.overlayScrollbars.min.js`;
    // overlayScrollbars.async = true;
    // const adminlte = document.createElement("script");
    // adminlte.src = `${process.env.PUBLIC_URL}/assets/adminlte/dist/js/adminlte.js`;
    // adminlte.async = true;
    // document.body.appendChild(jquery);
    // document.body.appendChild(bootstrap);
    // document.body.appendChild(overlayScrollbars);
    // document.body.appendChild(adminlte);
  }, []);

  return (
    <div className="wrapper">
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link
              className="nav-link"
              data-widget="pushmenu"
              to="/admin"
              role="button"
            >
              <i className="fas fa-bars"></i>
            </Link>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link">
              <i className="fas fa-home"></i> Pagina Inicial
            </a>
          </li>
        </ul>
      </nav>

      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/admin" className="brand-link">
          <span className="brand-text font-weight-light">
            #ValorizeSuaCidade
          </span>
        </Link>

        <div className="sidebar">
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* <NavItem to={'/'} label="Home" icon="fa-home" />
              <NavItem to={'/orcamento'} label="Orçamento / Carrinho" icon="fa-credit-card" />
              <NavItem to={'/locacoes'} label="Locações / Devoluções" icon="fa-shopping-cart" /> */}

              <li className="nav-item">
                <Link to="/admin/marcadores" className="nav-link">
                  <i className="nav-icon fas fa-th" />
                  <p>Estruturas Geográficas</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/produtores" className="nav-link">
                  <i className="nav-icon fas fa-th" />
                  <p>Produtores</p>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Painel Administrativo</h1>
              </div>
              <div className="col-sm-6">{/* <Breadcrumb /> */}</div>
            </div>
          </div>
        </div>

        <section className="content">
          <div className="container-fluid">{children}</div>
        </section>
      </div>
    </div>
  );
};

export default Admin;
