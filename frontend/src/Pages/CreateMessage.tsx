import { useState, useCallback } from "react";
import { useHistory } from "react-router";
import { useClient } from "../Client/Provider";
import ApplicationShell from "../Components/ApplicationShell";

const CreateMessagePage = () => {
  const c = useClient();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [revealedDate, setRevealedDate] = useState("");

  const updateTitle = useCallback((e) => setTitle(e.target.value), []);
  const updateContent = useCallback((e) => setContent(e.target.value), []);
  const updateRevealedDate = useCallback(
    (e) => setRevealedDate(e.target.value),
    []
  );

  const submit = useCallback(
    async (event) => {
      event.preventDefault();
      const { id } = await c.submit(title, content, revealedDate);
      history.push(`/${id}`);
    },
    [c, history, title, content, revealedDate]
  );

  return (
    <ApplicationShell pageHeader={"Sealed Messages"}>
      <form onSubmit={submit}>
        <div className="mx-auto max-w-6lg">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 leading-6">
              Seal your message
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be public so be careful what you share.
            </p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <div className="mt-1">
              <input
                id="title"
                name="title"
                type="text"
                className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                required
                onChange={updateTitle}
                value={title}
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <div className="mt-1">
              <textarea
                id="content"
                name="content"
                rows={3}
                className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                required
                onChange={updateContent}
                value={content}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              What would you like to tell your future self?
            </p>
          </div>
          <div className="mb-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              When do you want to see it?
            </label>
            <div className="mt-1">
              <input
                id="revealedDate"
                name="revealedDate"
                type="datetime-local"
                className="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                required
                onChange={updateRevealedDate}
                value={revealedDate}
              />
            </div>
          </div>
        </div>
        <div className="flex pt-2">
          <div className="flex-grow"></div>
          <button
            type="submit"
            className="inline-flex items-center px-3 py-2 mr-2 text-sm font-medium text-white bg-indigo-600 border border-transparent leading-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </ApplicationShell>
  );
};
export default CreateMessagePage;
