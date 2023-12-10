import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/react";
import Post from "./_components/Post/Post";

export default async function Home() {
  const session = await getServerAuthSession();

  const currentUser = session?.user;

  // if (!currentUser) return null;

  return (
    <main className="flex h-screen justify-center">
      <div className="w-full border-x border-slate-400 md:max-w-2xl">
        {currentUser && (
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
            <input
              placeholder="Type something"
              type="text"
              className="
            grow
            bg-transparent
            outline-none
          "
            />
          </div>
        )}
        {/* <div className="border-b border-slate-400 p-4">
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="center"
          >
            {session ? "Sign out" : "Sign in"}
          </Link>
        </div> */}
        <Post />
      </div>
    </main>
  );
}
