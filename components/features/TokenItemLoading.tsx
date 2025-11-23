"use client";

import React from "react";
import { Skeleton } from "../ui/Skeleton";

const TokenItemLoading = () => {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-zinc-800/50 bg-zinc-900/40 px-3 py-2.5">
      <Skeleton className="h-14 w-14 rounded-lg shrink-0" />

      {/* Token Info */}
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-24" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
        </div>
      </div>

      {/* Price Info */}
      <div className="flex flex-col items-end gap-2">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-3 w-12" />
      </div>

      <Skeleton className="h-8 w-16 rounded-md" />
    </div>
  );
};

export default TokenItemLoading;
