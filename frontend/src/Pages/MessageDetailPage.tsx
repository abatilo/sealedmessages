import React, { Suspense } from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import ApplicationShell from "../Components/ApplicationShell";
import DescriptionCard from "../Components/DescriptionCard";

type Params = {
  id: string;
};

const getMessage = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();
  const { id, title, content, created_date, revealed_date, revealed } = data;
  return (
    <DescriptionCard
      key={id}
      id={id}
      title={title}
      content={content}
      createdDate={created_date}
      revealedDate={revealed_date}
      revealed={revealed}
    />
  );
};

const MessageDetailPage = () => {
  const { id } = useParams<Params>();
  const { data } = useSWR(`/api/v1/messages/${id}`, getMessage);

  return (
    <ApplicationShell pageHeader={"Sealed Messages"}>
      <Suspense fallback={<div>Loading message</div>}>{data}</Suspense>
    </ApplicationShell>
  );
};
export default MessageDetailPage;
