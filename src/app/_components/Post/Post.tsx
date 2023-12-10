"use client";
import Image from "next/image";
import { api } from "~/trpc/react";
import { RouterOutputs } from "~/trpc/shared";
import PostSkeleton from "../ui/PostSkeleton";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

const PostView = (props: PostWithUser) => {
  const { post, user } = props;
  const { data, isLoading } = api.posts.getAll.useQuery();
  return (
    <div key={post.id} className="flex gap-3 border-b border-slate-400 p-8">
      <Image
        src={user.image as string}
        alt={`@${user.name}'s profile picture`}
        height={56}
        width={56}
        className="rounded-full"
        quality="100"
        priority
      />
      <div className=" flex flex-col">
        <div className="text-slate-30 flex gap-1">
          <span className="text-sm">
            {`@${user.name}`}
            <span className="px-1 font-thin">{`· ${dayjs(
              post.createdAt,
            ).fromNow()}`}</span>
          </span>
        </div>
        <span className="text-xl">{post.content}</span>
      </div>
    </div>
  );
};

const Post = () => {
  const { data, isLoading } = api.posts.getAll.useQuery();
  const numPosts = 5;
  if (isLoading) return <PostSkeleton posts={numPosts} />;
  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex h-full flex-col overflow-y-auto">
      {data?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

export default Post;
