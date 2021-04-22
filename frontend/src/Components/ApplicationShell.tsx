import { LockClosedIcon } from "@heroicons/react/outline";
import React, { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  pageHeader: string;
};

const ApplicationShell = ({ children, pageHeader }: Props) => {
  return (
    <div>
      <div className="min-h-screen bg-gray-50">
        <div className="py-4">
          <header className="pb-2">
            <div className="px-4 max-w-7xl sm:px-6 lg:px-8 mb-2">
              <div className="flex">
                <LockClosedIcon className="w-8 h-8 mr-1" />
                <div>
                  <h1 className="text-3xl font-bold leading-tight text-gray-900">
                    {pageHeader}
                  </h1>
                  <h1 className="text-xl leading-tight text-gray-500">
                    Save a message for later
                  </h1>
                </div>
              </div>
            </div>
            <hr className="mx-8" />
          </header>
          <main className="py-2 mx-20 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default ApplicationShell;
