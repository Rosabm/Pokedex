import "./index.css";
import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Outlet />
    </>
  );
}
