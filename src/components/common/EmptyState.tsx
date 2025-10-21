import ImageEmpty from "@/assets/images/img-Empty.svg";

interface EmptyStateProps {
  message: string;
  minHeight?: string;
}

export const EmptyState = ({
  message,
  minHeight = "400px",
}: EmptyStateProps) => (
  <div
    className={`flex flex-col gap-8 min-h-[${minHeight}] items-center justify-center pt-10`}
  >
    <ImageEmpty />
    <p className="ml-4 text-base text-slate-400">{message}</p>
  </div>
);
