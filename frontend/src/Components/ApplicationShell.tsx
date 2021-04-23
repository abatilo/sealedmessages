import { LockClosedIcon } from "@heroicons/react/outline";
import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children?: ReactNode;
  pageHeader: string;
};

const ApplicationShell = ({ children, pageHeader }: Props) => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="flex mb-2">
        <Link to="/">
          <LockClosedIcon className="w-8 h-8 mr-1" />
        </Link>
        <div>
          <Link to="/">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              {pageHeader}
            </h1>
            <h1 className="text-xl leading-tight text-gray-500">
              Save a message for later
            </h1>
          </Link>
        </div>
      </div>
      <hr className="mx-8" />
      <main className="py-2 mx-20 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
};

export default ApplicationShell;
