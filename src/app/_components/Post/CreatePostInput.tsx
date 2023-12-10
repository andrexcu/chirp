"use client";
import { useState } from "react";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";

const CreatePostInput = () => {
  const [input, setInput] = useState("");

  const ctx = api.useUtils();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      ctx.posts.getAll.invalidate();
      toast.success("Post successfully created!");
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  return (
    <>
      <input
        placeholder="Type something"
        type="text"
        className={` 
            grow
            bg-transparent
            outline-none
            ${input && "border-b border-slate-200/20"}`}
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      {input && (
        <div className="flex items-center gap-2">
          <button
            onClick={() => mutate({ content: input })}
            disabled={isPosting}
          >
            Post
          </button>
          {isPosting && <Spinner />}
        </div>
      )}
    </>
  );
};

export default CreatePostInput;
