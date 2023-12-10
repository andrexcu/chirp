import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";
import { api } from "~/trpc/react";
import CreatePostInput from "./CreatePostInput";

const CreatePost = async () => {
  const session = await getServerAuthSession();

  const currentUser = session?.user;

  return (
    <div className="flex w-full gap-3 border-b border-slate-400 p-8">
      <Image
        src={currentUser?.image as string}
        alt="profile"
        height={56}
        width={56}
        className="rounded-full"
        quality="100"
        priority
      />
      <CreatePostInput />
    </div>
  );
};

export default CreatePost;
