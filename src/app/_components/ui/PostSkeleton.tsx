import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type PostSkeletonProps = {
  posts: number;
};

const PostSkeleton = ({ posts }: PostSkeletonProps) => {
  const skeletonArray = Array.from({ length: posts });
  return (
    <div className="opacity-10">
      {skeletonArray?.map((post, _i) => (
        <div
          key={_i}
          className="flex items-center border-b border-slate-400 p-8"
        >
          <Skeleton circle width={64} height={64} />
          <div className=" flex flex-col p-4">
            <div className="flex">
              <Skeleton width={100} />
            </div>
            <Skeleton width={520} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostSkeleton;
