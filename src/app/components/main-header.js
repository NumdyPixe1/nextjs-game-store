import Link from "next/link";
import NavLink from "./NavLink";

export default function MainHeader() {
  return (
    <header id="main-header">
      <div id="logo">
        <Link href="/">Game Store</Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink href="/">All game</NavLink>
          </li>
          <li>{/* <NavLink href="/archive">Archive</NavLink> */}</li>
          <li>
            <NavLink href="/admin/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink href="/admin">Edit Product</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
