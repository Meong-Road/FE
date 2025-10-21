interface LoadingStateProps {
  message?: string;
  minHeight?: string;
}

export const LoadingState = ({
  message = "로딩 중...",
  minHeight = "400px",
}: LoadingStateProps) => (
  <div style={{ minHeight }} className={`flex items-center justify-center`}>
    <p className="text-lg font-semibold text-slate-400">{message}</p>
  </div>
);
