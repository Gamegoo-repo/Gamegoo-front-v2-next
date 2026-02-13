export function Comments({ comments }: { comments: string }) {
  return <div className="rounded-xl border border-gray-300 bg-white px-4 py-2">{comments}</div>;
}
