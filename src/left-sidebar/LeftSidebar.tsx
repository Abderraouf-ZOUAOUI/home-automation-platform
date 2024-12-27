import { Link, useNavigate } from "react-router-dom";
import "./left-sidebar.css";
import classNames from "classnames";
import { Fragment } from "react/jsx-runtime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

type LeftSidebarProps = {
  isLeftSidebarCollapsed: boolean;
  changeIsLeftSidebarCollapsed: (isLeftSidebarCollapsed: boolean) => void;
};

const LeftSidebar = ({
  isLeftSidebarCollapsed,
  changeIsLeftSidebarCollapsed,
}: LeftSidebarProps) => {
  const navigate = useNavigate();

  const items = [
    {
      routerLink: "Dashboard",
      icon: "fal fa-home",
      label: "Dashboard",
    },
    {
      routerLink: "Composantes",
      icon: "fal fa fa-plus",
      label: "Components",
    },
    {
      routerLink: "SecurityMod",
      icon: "fas fa-shield-alt",
      label: "Security Mode",
    },
    {
      routerLink: "Notification",
      icon: "fa fa-bell",
      label: "Notification",
    },
  ];

  // Classes conditionnelles
  const sidebarClasses = classNames({
    sidenav: true,
    "sidenav-collapsed": isLeftSidebarCollapsed,
  });

  const closeSidenav = () => {
    changeIsLeftSidebarCollapsed(true);
  };

  const toggleCollapse = (): void => {
    changeIsLeftSidebarCollapsed(!isLeftSidebarCollapsed);
  };

  // Fonction de déconnexion modifiée
  const handleLogout = () => {
    // Supprimer le token du localStorage
    localStorage.removeItem("token");
    
    // Optionnellement supprimer d'autres éléments liés à l'authentification du localStorage ou sessionStorage
    sessionStorage.removeItem("token");

    // Rediriger l'utilisateur vers la page de connexion
    navigate("/login");
  };

  return (
    <div className={sidebarClasses}>
      <div className="logo-container">
        <button className="btn-close" onClick={toggleCollapse}>
          <FontAwesomeIcon icon={faBars} size="2x" />
        </button>
        {!isLeftSidebarCollapsed && (
          <Fragment>
            <div className="logo-text">Smart Home</div>
          </Fragment>
        )}
      </div>
      <div className="sidenav-nav">
        {items.map((item) => (
          <li key={item.label} className="sidenav-nav-item">
            <Link className="sidenav-nav-link" to={item.routerLink}>
              <i
                className={classNames({
                  "sidenav-link-icon": true,
                  [item.icon]: true,
                })}></i>
              {!isLeftSidebarCollapsed && (
                <span className="sidenav-link-text">{item.label}</span>
              )}
            </Link>
          </li>
        ))}
        {/* Ajout du bouton de déconnexion */}
        <li className="sidenav-nav-item">
          <button className="sidenav-nav-link" onClick={handleLogout}>
            <i className="sidenav-link-icon fas fa-sign-out-alt"></i>
            {!isLeftSidebarCollapsed && (
              <span className="sidenav-link-text">Logout</span>
            )}
          </button>
        </li>
      </div>
    </div>
  );
};

export default LeftSidebar;