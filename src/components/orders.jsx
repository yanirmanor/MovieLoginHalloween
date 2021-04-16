import React, { useEffect, useState } from "react";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Subject } from "rxjs";
import { Table, Column } from "react-rainbow-components";
import { useProdouctQuery } from "../hooks/useProdouctQuery";

export const Orders = ({ accessToken }) => {
  const [page, setPage] = React.useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [onSearch$] = useState(() => new Subject());
  const { isLoading, isFetching, isError, data } = useProdouctQuery(
    accessToken,
    page,
    searchQuery
  );
  console.log("data", data);
  const totalPages = data?.total / data?.orders.length;
  console.log("totalPages", totalPages);

  const handleChange = (event) => {
    setSearchInput(event.target.value);
    onSearch$.next(event.target.value);
  };

  useEffect(() => {
    const subscription = onSearch$
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(setSearchQuery);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const ProductImg = ({ value }) => {
    return <img src={value} alt="img" />;
  };

  const CreateDate = ({ value }) => {
    const date = new Date(value);
    const dateFormat = date.toLocaleDateString("en-US");
    return <div>{dateFormat}</div>;
  };

  if (isError) {
    return <div>Opps error...</div>;
  }
  return (
    <div className="relative">
      <div className="flex items-center justify-center flex-wrap bg-gray-200 p-6">
        <input
          name="searchInput"
          type="text"
          value={searchInput}
          placeholder="Search..."
          className="shadow border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent border-gray-400 p-2 mr-5 w-2/3 rounded-md"
          onChange={handleChange}
        />
      </div>
      <div
        className="overflow-y-auto"
        style={{ height: "calc(100vh - 270px)" }}
      >
        <Table
          className="p-10 overflow-y-auto"
          keyField="product.name"
          isLoading={isLoading}
          data={data?.orders}
          isLoading={isFetching}
        >
          <Column header="Product" field="product.name" />
          <Column header="Image" field="product.image" component={ProductImg} />
          <Column header="Quantity" field="product.quantity" />
          <Column header="Date" field="created_at" component={CreateDate} />
          <Column header="Status" cellAlignment="center" field="status" />
          <Column header="Total" field="total" />
        </Table>

        <div className="absolute flex w-full justify-center items-center">
          <button
            className="h-10 ml-3 relative sm:mt-0 sm:h-auto block w-full sm:w-auto border border-transparent px-3 py-2 text-base font-semibold leading-snug bg-gray-900 text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800 transition ease-in-out duration-150 hover:bg-gray-600"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <div className="h-10 flex justify-center items-center mx-2 w-32">
            {page} / {totalPages}
          </div>
          <button
            className="h-10 mr-3 relative sm:mt-0 sm:h-auto sm:ml-4 block w-full sm:w-auto border border-transparent px-3 py-2 text-base font-semibold leading-snug bg-gray-900 text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:bg-gray-800 transition ease-in-out duration-150 hover:bg-gray-600"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
