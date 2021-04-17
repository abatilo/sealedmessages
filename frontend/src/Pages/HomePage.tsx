import { useState, Suspense } from "react";
import useSWR from "swr";

const listMessages = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return data?.results?.map(
    ({
      id,
      title,
      content,
      created_date,
      revealed_date,
      revealed,
    }: {
      id: any;
      title: any;
      content: any;
      created_date: any;
      revealed_date: any;
      revealed: boolean;
    }) => {
      let icon = (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          ></path>
        </svg>
      );

      if (revealed) {
        icon = (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
          </svg>
        );
      }

      return (
        <tr key={id} className="even:bg-blue-100 odd:bg-blue-200">
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {icon}
          </td>
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {id}
          </td>
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {title}
          </td>
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {content}
          </td>
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {created_date}
          </td>
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {revealed_date}
          </td>
        </tr>
      );
    }
  );
};

const HomePage = () => {
  const [revealedOnly, setRevealedOnly] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const { data, error } = useSWR(
    `/api/v1/messages?page=${pageIndex}${revealedOnly ? "&revealed=1" : ""}`,
    listMessages
  );

  return (
    <div className="h-screen p-12">
      <div className="flex flex-col h-full">
        <div className="h-full -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative flex items-start mb-2">
              <div className="flex items-center h-5">
                <input
                  onChange={(e) => setRevealedOnly(e.target.checked)}
                  checked={revealedOnly}
                  id="revealed"
                  name="revealed"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="revealed" className="font-medium text-gray-700">
                  Revealed
                </label>
                <p className="text-gray-500">Only show revealed messages</p>
              </div>
            </div>
            <div className="overflow-hidden border border-b border-blue-200 shadow-xl sm:rounded-lg">
              <table className="min-w-full divide-y divide-blue-200">
                <thead className="bg-blue-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    ></th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Content
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Created
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                    >
                      Revealed
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <Suspense fallback={<div>Loading messages</div>}>
                    {data}
                  </Suspense>
                </tbody>
              </table>
            </div>
          </div>
          <div className="p-8">
            {data?.previous ? (
              <button
                onClick={() => setPageIndex(pageIndex - 1)}
                type="button"
                className="inline-flex items-center px-3 py-2 mr-2 text-sm font-medium text-white bg-blue-600 border border-transparent leading-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Previous
              </button>
            ) : (
              <button className="inline-flex items-center px-3 py-2 mr-2 text-sm font-medium text-white bg-blue-300 border border-transparent leading-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Previous
              </button>
            )}
            {data?.next ? (
              <button
                onClick={() => setPageIndex(pageIndex + 1)}
                type="button"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent leading-4 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Next
              </button>
            ) : (
              <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-300 border border-transparent leading-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
