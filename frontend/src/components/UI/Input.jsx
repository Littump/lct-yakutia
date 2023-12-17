export const BackButton = ({ className, variant, ...props }) => {
  return (
    <button
      className={`
        ${variant === "icon" && "text-blue-500"} 
        text-black 
        ${className}
      `}
      {...props}
    >
      {variant === "icon" ? "иконка назад" : "Назад"}
    </button>
  );
};
