import { Link } from "react-router";

function NotFound() {
  return (
    <>
      <div>NotFound</div>
      <p>
        Go to the <Link to="/">Homepage</Link>
      </p>
    </>
  );
}

export default NotFound;
