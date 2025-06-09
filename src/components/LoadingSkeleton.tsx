
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-24" />
              <div className="h-6 w-px bg-border" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-28" />
            </div>
          </div>
        </div>
      </div>

      {/* Loading Animation */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Loading Portfolio Builder</h2>
          <p className="text-muted-foreground">Setting up your LaTeX environment...</p>
        </div>

        {/* Progress Bars */}
        <div className="max-w-md mx-auto space-y-4 mb-12">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Loading templates</span>
              <span>100%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-full transition-all duration-1000"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Initializing editor</span>
              <span>75%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-3/4 transition-all duration-1000 delay-500"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Setting up compiler</span>
              <span>50%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary w-1/2 transition-all duration-1000 delay-1000"></div>
            </div>
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Templates Column */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="space-y-1 flex-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full rounded-lg" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Editor Column */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-28" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from({ length: 15 }).map((_, i) => (
                  <Skeleton key={i} className={`h-4 ${i % 3 === 0 ? 'w-full' : i % 3 === 1 ? 'w-3/4' : 'w-1/2'}`} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Preview Column */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full rounded-lg" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
