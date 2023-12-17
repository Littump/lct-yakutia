export const Block = ({ className, children, ...props }) => {
  return (
    <div
      className={`
        py-8 px-6 bg-white rounded-3xl
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
