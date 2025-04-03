import { Link, NavLink, Outlet } from "react-router";
import { Button, Navbar } from "flowbite-react";
import { useState } from "react";

function NavbarComponent() {
  const [session, setSession] = useState<any>(true);
  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Ink<span className="text-blue-600">spire</span>
          </span>
        </Navbar.Brand>
        {!session ? (
          <div className="flex md:order-2">
            <Link to="login">
              <Button className="border-none" color="light">
                Sign In
              </Button>
            </Link>
            <Link to="register">
              <Button className="bg-blue-600" color="blue">
                Sign Up
              </Button>
            </Link>
            <Navbar.Toggle />
          </div>
        ) : (
          <div className="flex md:order-2">
            <Link to="profileLander">
              <Button className="border-none" color="light">
                User
              </Button>
            </Link>

            <Button onClick={() => {}} className="bg-blue-600" color="blue">
              Sign Out
            </Button>

            <Navbar.Toggle />
          </div>
        )}
        <Navbar.Collapse>
          {/* <Navbar.Link href="BlogsPage">Blogs</Navbar.Link> */}

          <NavLink className="text-gray-600" to="/">
            Home
          </NavLink>
          <NavLink className="text-gray-600" to="BlogsPage">
            Blogs
          </NavLink>
          <NavLink className="text-gray-600" to="#">
            Products
          </NavLink>
          <NavLink className="text-gray-600" to="#">
            Pricing
          </NavLink>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
