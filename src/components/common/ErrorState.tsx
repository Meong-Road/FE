interface ErrorStateProps {
  message?: string;
  minHeight?: string;
}

export const ErrorState = ({
  message = "데이터를 불러오는데 실패했습니다.",
  minHeight = "400px",
}: ErrorStateProps) => (
  <div className={`flex min-h-[${minHeight}] items-center justify-center`}>
    <p className="text-red-400">{message}</p>
  </div>
);
