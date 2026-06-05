const ErrorBanner = ({ message }: { message: string }) => (
  <div className="rounded-2xl border border-danger/20 bg-danger/5 p-4 text-danger">
    <p className="font-semibold">Error</p>
    <p className="mt-1 text-sm">{message}</p>
  </div>
);

export default ErrorBanner;
