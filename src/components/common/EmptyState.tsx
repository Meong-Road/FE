interface EmptyStateProps {
  message: string;
  minHeight?: string;
}

export const EmptyState = ({
  message,
  minHeight = "400px",
}: EmptyStateProps) => (
  <div style={{ minHeight }} className={`flex items-center justify-center`}>
    <p className="text-slate-600">{message}</p>
  </div>
);
