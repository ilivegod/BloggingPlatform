import { useParams } from "react-router";

function BlogDetail() {
  const { blogId } = useParams();
  return <div>{blogId}</div>;
}

export default BlogDetail;
