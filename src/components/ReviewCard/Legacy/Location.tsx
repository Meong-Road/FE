export function Location({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm text-slate-600">
      <span className="text-slate-400">위치:</span> {children}
    </div>
  );
}
