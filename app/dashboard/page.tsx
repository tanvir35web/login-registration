"use client";

import { useGetDashboardQuery } from "@/features/api/authApi";
import { useAuthGuard } from "@/lib/authGuard";

export default function DashboardPage() {
  useAuthGuard();
  const { data, isLoading } = useGetDashboardQuery({});

  return (
    <div>
      <h1>Dashboard</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
}
