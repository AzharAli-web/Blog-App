"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export default function BlogSkeleton() {
  return (
    <div className="w-full bg-background min-h-screen">
      {/* Hero Skeleton */}
      <div className="relative w-full h-[50vh] md:h-[60vh] flex flex-col justify-center items-center px-4">
        <Skeleton className="w-full h-full absolute inset-0 rounded-none" />
        <div className="relative z-10 max-w-4xl w-full space-y-6">
          <div className="flex justify-center gap-2">
            <Skeleton className="w-20 h-6 rounded-md" />
            <Skeleton className="w-20 h-6 rounded-md" />
          </div>
          <Skeleton className="w-full h-12 md:h-16 mx-auto rounded-xl" />
          <Skeleton className="w-3/4 h-12 md:h-16 mx-auto rounded-xl" />
          <div className="flex justify-center gap-6 mt-8">
            <Skeleton className="w-40 h-12 rounded-2xl" />
            <Skeleton className="w-32 h-6 mt-3" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Skeleton */}
          <div className="lg:flex-1 max-w-[850px]">
            <div className="glass-card bg-surface/90 backdrop-blur shadow-xl rounded-[2.5rem] p-8 md:p-12 lg:p-16 mb-8">
              <div className="space-y-4">
                <Skeleton className="w-full h-6 rounded-lg" />
                <Skeleton className="w-full h-6 rounded-lg" />
                <Skeleton className="w-5/6 h-6 rounded-lg" />
                <Skeleton className="w-full h-6 rounded-lg" />
                <Skeleton className="w-4/6 h-6 rounded-lg" />
                <div className="py-12">
                   <Skeleton className="w-full h-[400px] rounded-[2rem]" />
                </div>
                <Skeleton className="w-full h-6 rounded-lg" />
                <Skeleton className="w-full h-6 rounded-lg" />
                <Skeleton className="w-3/4 h-6 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="w-full lg:w-[350px] space-y-8">
            <div className="glass-card bg-surface/90 backdrop-blur shadow-lg rounded-[2rem] p-8">
              <Skeleton className="w-16 h-16 rounded-2xl mb-6" />
              <Skeleton className="w-32 h-6 mb-2" />
              <Skeleton className="w-full h-20 rounded-xl mb-6" />
              <Skeleton className="w-full h-12 rounded-xl" />
            </div>
            
            <div className="glass-card bg-surface/90 backdrop-blur shadow-lg rounded-[2rem] p-8">
              <Skeleton className="w-40 h-5 mb-6" />
              <div className="space-y-4">
                <Skeleton className="w-full h-4 rounded-full" />
                <Skeleton className="w-full h-4 rounded-full" />
                <Skeleton className="w-full h-4 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
