import Post from "./_components/Post/Post";
import CreatePost from "./_components/Post/CreatePost";
import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();
  const currentUser = session?.user;
  return (
    <>
      <div className="flex border-b border-slate-400 p-4">
        {!session && (
          <Link
            href={session ? "/api/auth/signout" : "/api/auth/signin"}
            className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            Sign in
          </Link>
        )}
        {session && <CreatePost />}
      </div>
      <Post />

      {/* <div className="flex items-center justify-between p-4 text-xl">
          
        </div> */}
    </>
  );
}
