import { useParams } from "react-router";

function BlogDetailPage() {
  const { blogId } = useParams();
  return <div>{blogId}</div>;
}

export default BlogDetailPage;
