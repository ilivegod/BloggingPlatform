import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../../config/supabaseClient";
import { Link } from "react-router";
import { Button } from "flowbite-react";
import Account from "../profile/profilePage";

function ProfileLander() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

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
    /* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} /> */
  }
}

export default ProfileLander;
