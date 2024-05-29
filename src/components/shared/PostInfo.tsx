import { Models } from 'appwrite';

/* Shows the post caption and tags */
const PostInfo = ({ post }: { post: Models.Document }) => (
  <>
    <p>{post.caption}</p>
    <ul className="flex gap-1 mt-2">
      {post.tags.map((tag: string) => (
        <li key={tag} className="text-light-3">
          #{tag}
        </li>
      ))}
    </ul>
  </>
);

export default PostInfo;
