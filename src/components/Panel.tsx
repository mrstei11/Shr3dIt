export function Panel({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`box ${className}`}>
      <div className="box-header">{title}</div>
      <div className="p-4">{children}</div>
    </div>
  );
}
