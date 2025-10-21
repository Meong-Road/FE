import EmptySvg from "@/assets/icons/empty.svg";

interface EmptyStateProps {
  message: string;
  minHeight?: string;
}

export const EmptyState = ({
  message,
  minHeight = "400px",
}: EmptyStateProps) => (
  <div
    style={{ minHeight }}
    className={`flex flex-col items-center justify-center gap-y-4`}
  >
    <EmptySvg className="w-40" />
    <p className="text-lg font-semibold text-slate-400">{message}</p>
  </div>
);
