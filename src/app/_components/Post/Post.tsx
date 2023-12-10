"use client";
import Image from "next/image";
import { api } from "~/trpc/react";
import { RouterOutputs } from "~/trpc/shared";

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, user } = props;
  return (
    <div
      key={post.id}
      className="flex items-center border-b border-slate-400 p-8"
    >
      <Image
        src={user.image as string}
        alt="profile"
        height={64}
        width={64}
        className="rounded-full"
        quality="100"
        priority
      />
      <div className=" flex flex-col p-4">
        <div className="flex">
          <span className="text-sm">{`@${user.name}`}</span>
        </div>
        <span>{post.content}</span>
      </div>
    </div>
  );
};

const Post = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {data?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

export default Post;
