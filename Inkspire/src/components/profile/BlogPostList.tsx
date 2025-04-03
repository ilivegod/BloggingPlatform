import { Link } from "react-router";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
}

interface BlogPostListProps {
  posts: BlogPost[];
}

export default function BlogPostList({ posts }: BlogPostListProps) {
  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-6">Blog Posts</h2>
      <div className="space-y-6 ">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow rounded-lg p-6 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <h3 className="text-xl font-semibold mb-2">
              <Link
                to={`/posts/${post.id}`}
                className="text-blue-600 hover:underline"
              >
                {post.title}
              </Link>
            </h3>
            <p className="text-gray-600 mb-4">{post.excerpt}</p>
            <p className="text-sm text-gray-500">Published on {post.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
