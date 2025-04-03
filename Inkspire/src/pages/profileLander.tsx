import { useEffect, useState } from "react";

import { Link } from "react-router";
import { Button } from "flowbite-react";
import Account from "./profilePage";

function ProfileLander() {
  const [session, setSession] = useState<any>(true);

  if (!session) {
    return (
      <Link to="auth/login">
        <Button className="bg-gray-900 hover:bg-gray-100" size="sm">
          Login
        </Button>
      </Link>
    );
  } else {
    return <Account key={session.user.id} session={session} />;
  }

  {
  }
}

export default ProfileLander;
