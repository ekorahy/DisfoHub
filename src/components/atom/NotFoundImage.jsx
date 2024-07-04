export default function NotFoundImage() {
  return (
    <div className="text-center">
      <h2 className="mb-2 text-4xl font-bold text-slate-400">Error 404</h2>
      <img className="mb-2 w-48" src="/not-found.png" alt="not found image" />
      <p className="text-slate-400">Page Not Found.</p>
    </div>
  );
}
