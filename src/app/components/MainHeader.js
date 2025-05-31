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
            <Link href="/">All game</Link>
          </li>
          {/* <li>
            <NavLink href="/admin/profile">Profile</NavLink>
          </li> */}
          <li>
            <Link href="/admin">Edit Product</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
