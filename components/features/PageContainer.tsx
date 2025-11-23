"use client";

import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className="flex-1 overflow-hidden bg-black">
      <div className="h-full px-0 md:px-4 lg:px-6 xl:px-8 py-4 md:py-6">
        <div className="h-full max-w-[2000px] mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
