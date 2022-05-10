import { useQuery } from "react-query";

const fetchDashboard = async (accessToken) => {
  const res = await fetch("https://freddy.codesubmit.io/dashboard", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const content = await res.json();

  return {
    sales_over_time_week: Object.values(content.dashboard.sales_over_time_week),
    sales_over_time_year: Object.values(content.dashboard.sales_over_time_year),
  };
};

export function useDashboardQuery(accessToken) {
  return useQuery("dashboard", () => fetchDashboard(accessToken), {
    staleTime: 10000,
    cacheTime: 10,
  });
}
