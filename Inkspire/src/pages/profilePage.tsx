import { useEffect } from "react";
import { useForm } from "react-hook-form";

import ProfileHeader from "../components/profile/ProfileHeader";
import BlogPostList from "../components/profile/BlogPostList";

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

  return (
    <div className="container mx-auto px-4 py-8">
      <ProfileHeader user={mockUser} />
      <BlogPostList posts={mockPosts} />
    </div>
  );
}
