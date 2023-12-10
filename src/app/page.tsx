import Post from "./_components/Post/Post";
import CreatePost from "./_components/Post/CreatePost";

export default function Home() {
  return (
    <main className="flex h-screen justify-center">
      <div className="w-full border-x border-slate-400 md:max-w-2xl">
        <CreatePost />
        <Post />
      </div>
    </main>
  );
}
