"use client";

import { useGetDashboardQuery } from "@/features/api/authApi";
import { useAuthGuard } from "@/lib/authGuard";

export default function DashboardPage() {
  useAuthGuard();
  const { data, isLoading } = useGetDashboardQuery({});

  return (
    <div className="p-4">
      <h1 className="text-5xl font-bold mb-4">Dashboard</h1>
      {isLoading ? (
        <p className="animate-pulse">Loading...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
