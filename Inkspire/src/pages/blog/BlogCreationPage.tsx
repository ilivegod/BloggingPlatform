import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../../config/supabaseClient";
import { Link } from "react-router";
import { Button } from "flowbite-react";
import Account from "../profile/profilePage";

function BlogCreationPage() {
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-blue-100 border-l-4 border-blue-500 text-gray-900 p-6 rounded-md shadow-md max-w-md text-center">
          <h2 className="text-lg font-bold mb-4">Access Restricted</h2>
          <p className="mb-6">
            Only registered users can create content. Please log in to continue.
          </p>
          <Link to="/login">
            <button className="bg-gray-900 hover:bg-gray-700 text-white py-2 px-4 rounded">
              Login
            </button>
          </Link>
        </div>
      </div>
    );
  } else {
    return <Account key={session.user.id} session={session} />;
  }

  {
    /* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} /> */
  }
}

export default BlogCreationPage;
