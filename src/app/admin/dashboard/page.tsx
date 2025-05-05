export default function Dashboard() {
  return (
    <div className="flex flex-1">
    <div className="flex h-full w-full flex-1 flex-col gap-2 r border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
      <div className="flex gap-2">
        {[...new Array(4)].map((i, idx) => (
          <div
            key={"first-array-demo-1" + idx}
            className="h-20 w-full animate-pulse bg-white dark:bg-neutral-800"
          ></div>
        ))}
      </div>
      <div className="flex flex-1 gap-2">
        {[...new Array(2)].map((i, idx) => (
          <div
            key={"second-array-demo-1" + idx}
            className="h-full w-full animate-pulse bg-white dark:bg-neutral-800"
          ></div>
        ))}
      </div>
    </div>
  </div>
  );
}
