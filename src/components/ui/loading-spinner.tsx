
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  logo?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner = ({ logo, size = "md", className }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12", 
    lg: "h-16 w-16"
  };

  if (logo) {
    return (
      <div className={cn("animate-pulse", className)}>
        <img 
          src={logo} 
          alt="Loading..." 
          className={cn("animate-spin", sizeClasses[size])}
          style={{ animationDuration: '2s' }}
        />
      </div>
    );
  }

  return (
    <div className={cn("animate-spin rounded-full border-b-2 border-blue-600", sizeClasses[size], className)} />
  );
};
