import { useQuery } from "react-query";

const fetchOrders = async (accessToken, page, searchProduct) => {
  const res = await fetch(
    `https://freddy.codesubmit.io/orders?page=${page}&q=${searchProduct}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return res.json();
};

export function useProdouctQuery(accessToken, page, search) {
  return useQuery(
    ["orders", page, search],
    () => fetchOrders(accessToken, page, search),
    {
      keepPreviousData: true,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );
}
