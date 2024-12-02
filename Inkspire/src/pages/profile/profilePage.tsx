import { useEffect } from "react";
import { useForm } from "react-hook-form";
import supabase from "../../config/supabaseClient";
import ProfileHeader from "./components/ProfileHeader";
import BlogPostList from "./components/BlogPostList";

export default function Account({ session }: any) {
  const mockUser = {
    name: "Jane Doe",
    username: "@janedoe",
    bio: "Passionate writer | Tech enthusiast | Coffee lover",
    profilePicture: "/placeholder.svg?height=128&width=128",
    followers: 1234,
    following: 567,
  };

  const mockPosts = [
    {
      id: 1,
      title: "My First Blog Post",
      excerpt: "This is a short excerpt from my first blog post...",
      date: "2023-05-01",
    },
    {
      id: 2,
      title: "10 Tips for Better Writing",
      excerpt: "Improve your writing skills with these 10 simple tips...",
      date: "2023-05-15",
    },
    {
      id: 3,
      title: "The Future of AI",
      excerpt:
        "Exploring the potential impact of artificial intelligence on our lives...",
      date: "2023-06-01",
    },
  ];

  // const {
  //   register,
  //   handleSubmit,
  //   setValue,
  //   watch,
  //   formState: { isSubmitting },
  // } = useForm();

  // const avatar_url = watch("avatar_url"); // Watch avatar_url if it changes

  // useEffect(() => {
  //   let ignore = false;
  //   async function getProfile() {
  //     const { user } = session;
  //     try {
  //       const { data, error } = await supabase
  //         .from("profiles")
  //         .select(`username, website, avatar_url`)
  //         .eq("id", user.id)
  //         .single();

  //       if (!ignore && data) {
  //         setValue("username", data.username);
  //         setValue("website", data.website);
  //         setValue("avatar_url", data.avatar_url);
  //       }

  //       if (error) {
  //         console.warn(error);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching profile:", error);
  //     }
  //   }

  //   getProfile();
  //   return () => {
  //     ignore = true;
  //   };
  // }, [session, setValue]);

  // async function updateProfile(formData: any) {
  //   const { user } = session;

  //   const updates = {
  //     id: user.id,
  //     ...formData,
  //     updated_at: new Date(),
  //   };

  //   try {
  //     const { error } = await supabase.from("profiles").upsert(updates);

  //     if (error) {
  //       alert(error.message);
  //     }
  //   } catch (error) {
  //     console.error("Error updating profile:", error);
  //   }
  // }

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader user={mockUser} />
      <BlogPostList posts={mockPosts} />
    </div>
  );
}

{
  /* <form onSubmit={handleSubmit(updateProfile)} className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Name</label>
        <input
          id="username"
          type="text"
          required
          {...register("username", { required: true })}
        />
      </div>
      <div>
        <label htmlFor="website">Website</label>
        <input id="website" type="url" {...register("website")} />
      </div>
      <div>
        <label htmlFor="avatar_url">Avatar URL</label>
        <input id="avatar_url" type="url" {...register("avatar_url")} />
      </div>
      <div>
        <button
          className="button block primary"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Loading ..." : "Update"}
        </button>
      </div>
      <div>
        <button
          className="button block"
          type="button"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
    </form> */
}
