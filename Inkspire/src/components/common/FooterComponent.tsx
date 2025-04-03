import { Footer } from "flowbite-react";
import { Link, NavLink } from "react-router";

function FooterComponent() {
  return (
    <>
      <Footer container>
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Ink<span className="text-blue-600">spire</span>
            </span>
            <Footer.LinkGroup className="gap-7">
              <Link className="text-gray-600" to="">
                About
              </Link>
              <Link className="text-gray-600" to="">
                Privacy Policy
              </Link>
              <Link className="text-gray-600" to="">
                Licensing
              </Link>
              <Link className="text-gray-600" to="">
                Contact
              </Link>
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <Footer.Copyright href="#" by="Inkspire™" year={2024} />
        </div>
      </Footer>
    </>
  );
}

export default FooterComponent;
