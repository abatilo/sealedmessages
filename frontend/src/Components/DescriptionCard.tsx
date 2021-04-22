import { PaperClipIcon } from "@heroicons/react/solid";

type Props = {
  id: string;
  title: string;
  content: string;
  createdDate: string;
  revealedDate: string;
  revealed: boolean;
};
const DescriptionCard = ({
  title,
  id,
  content,
  createdDate,
  revealedDate,
  revealed,
}: Props) => {
  return (
    <div className="my-4 overflow-hidden bg-white border border-b shadow-lg border-gray-200 sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900 leading-6">{title}</h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">{id}</p>
      </div>
      <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Created on</dt>
            <dd className="mt-1 text-sm text-gray-900">{createdDate}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Revealed on</dt>
            <dd className="mt-1 text-sm text-gray-900">{revealedDate}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Content</dt>
            <dd className="mt-1 text-sm text-gray-900">{content}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
export default DescriptionCard;
