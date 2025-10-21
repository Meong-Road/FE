interface ErrorStateProps {
  message?: string;
  minHeight?: string;
}

export const ErrorState = ({
  message,
  minHeight = "400px",
}: ErrorStateProps) => (
  <div style={{ minHeight }} className={`flex items-center justify-center`}>
    <p className="text-lg font-semibold text-slate-400">{message}</p>
  </div>
);
