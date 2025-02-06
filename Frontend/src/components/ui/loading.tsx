import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}
