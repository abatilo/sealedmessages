import { useState, Suspense } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import useSWR from "swr";
import ApplicationShell from "../Components/ApplicationShell";

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
      let icon = <EyeOffIcon className="w-8 h-8" />;

      if (revealed) {
        icon = <EyeIcon className="w-8 h-8" />;
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
  const { data } = useSWR(
    `/api/v1/messages?page=${pageIndex}${revealedOnly ? "&revealed=1" : ""}`,
    listMessages
  );

  return (
    <ApplicationShell pageHeader={"Sealed Messages"}>
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
            <Suspense fallback={<div>Loading messages</div>}>{data}</Suspense>
          </tbody>
        </table>
      </div>
      <div className="py-8">
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
    </ApplicationShell>
  );
};
export default HomePage;
