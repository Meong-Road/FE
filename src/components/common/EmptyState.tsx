interface EmptyStateProps {
  message: string;
  minHeight?: string;
}

export const EmptyState = ({
  message,
  minHeight = "400px",
}: EmptyStateProps) => (
  <div className={`flex min-h-[${minHeight}] items-center justify-center`}>
    <p className="text-slate-400">{message}</p>
  </div>
);
