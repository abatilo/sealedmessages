import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import React from "react";
import { Link } from "react-router-dom";

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
  let icon = <EyeOffIcon className="w-6 h-6" />;

  if (revealed) {
    icon = <EyeIcon className="w-6 h-6" />;
  }
  return (
    <div className="my-4 overflow-hidden bg-white border border-b border-gray-200 shadow-lg sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center">
          <h3 className="mr-1 text-lg font-medium text-gray-900 leading-6">
            {title}
          </h3>
          {icon}
        </div>
        <Link className="text-sm text-gray-500 hover:underline" to={`/${id}`}>
          Permalink
        </Link>
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
