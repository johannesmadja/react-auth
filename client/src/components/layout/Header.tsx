import styles from "./Header.module.scss";
import type { MouseEvent } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "@/features/auth/context/AuthContext";

function Header() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  async function handleLogOut(event: MouseEvent<HTMLAnchorElement>) {
    // Wait for the API to clear the cookie before leaving the page
    event.preventDefault();
    await logOut();
    navigate("/signin");
  }

  return (
    <header className={`d-flex flex-row align-items-center ${styles.header}`}>
      {/* <span className="material-symbols-outlined mr-15">menu</span> */}
      <div className="flex-fill">
        <NavLink to="/">
          <span style={{ fontWeight: "bold" }}>JWT</span>
        </NavLink>
      </div>

      {user ? (
        <nav className={styles.headerList}>
          <NavLink to="/profile" className="mr-15">
            Profil
          </NavLink>

          <NavLink to="/signin" onClick={handleLogOut} className="mr-15">
            Deconnexion
          </NavLink>
        </nav>
      ) : (
        <nav className={styles.headerList}>
          <NavLink to="/signup" className="mr-15">
            Inscription
          </NavLink>

          <NavLink to="/signin" className="mr-15">
            Connexion
          </NavLink>
        </nav>
      )}
    </header>
  );
}

export default Header;
