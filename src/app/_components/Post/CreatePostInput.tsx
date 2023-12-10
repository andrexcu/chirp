"use client";
import { useState } from "react";
import { api } from "~/trpc/react";

const CreatePostInput = () => {
  const [input, setInput] = useState("");

  const ctx = api.useUtils();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      ctx.posts.getAll.invalidate();
    },
  });

  return (
    <>
      <input
        placeholder="Type something"
        type="text"
        className="
      value={input]
      grow
      bg-transparent
      outline-none
    "
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => mutate({ content: input })} disabled={isPosting}>
        Post
      </button>
    </>
  );
};

export default CreatePostInput;
