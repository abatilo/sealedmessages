import { useState, Suspense } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import useSWR from "swr";
import ApplicationShell from "../Components/ApplicationShell";
import DescriptionCard from "../Components/DescriptionCard";

const listMessages = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  return {
    previous: data?.previous,
    next: data?.next,
    children: data?.results?.map(
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
          <>
            <DescriptionCard
              id={id}
              title={title}
              content={content}
              createdDate={created_date}
              revealedDate={revealed_date}
              revealed={revealed}
            />
          </>
        );
      }
    ),
  };
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
      <Suspense fallback={<div>Loading messages</div>}>
        {data?.children}
      </Suspense>
      <div className="pt-2">
        {data?.previous ? (
          <button
            onClick={() => setPageIndex(pageIndex - 1)}
            type="button"
            className="inline-flex items-center px-3 py-2 mr-2 text-sm font-medium text-white bg-indigo-600 border border-transparent leading-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Previous
          </button>
        ) : (
          <button className="inline-flex items-center px-3 py-2 mr-2 text-sm font-medium text-white bg-indigo-300 border border-transparent leading-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Previous
          </button>
        )}
        {data?.next ? (
          <button
            onClick={() => setPageIndex(pageIndex + 1)}
            type="button"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent leading-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Next
          </button>
        ) : (
          <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-indigo-300 border border-transparent leading-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Next
          </button>
        )}
      </div>
    </ApplicationShell>
  );
};
export default HomePage;
