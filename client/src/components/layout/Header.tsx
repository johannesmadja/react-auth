import styles from "./Header.module.scss";
import { NavLink } from "react-router";

function Header() {
  return (
    <header className={`d-flex flex-row align-items-center ${styles.header}`}>
      {/* <span className="material-symbols-outlined mr-15">menu</span> */}
      <div className="flex-fill">
        <NavLink to="/">
          <span style={{ fontWeight: "bold" }}>JWT</span>
        </NavLink>
      </div>

      <nav className={styles.headerList}>
        <NavLink to="/signup" className="btn btn-primary mr-15">
          Inscription
        </NavLink>

        <button className="btn btn-primary">Connexion</button>
      </nav>
    </header>
  );
}

export default Header;
