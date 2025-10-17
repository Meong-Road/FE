interface LoadingStateProps {
  message?: string;
  minHeight?: string;
}

export const LoadingState = ({
  message = "로딩 중...",
  minHeight = "400px",
}: LoadingStateProps) => (
  <div className={`flex min-h-[${minHeight}] items-center justify-center`}>
    <p className="text-slate-400">{message}</p>
  </div>
);
