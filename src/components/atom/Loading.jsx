import LoadingBar from "react-redux-loading-bar";

export const Loading = () => {
  return (
    <div className="sticky top-0 z-20">
      <LoadingBar className="h-1 bg-green-400" />
    </div>
  );
};
