import { useClient } from "../Client/Provider";

const CreateMessagePage = () => {
  const c = useClient();
  console.log("From page: " + c.authenticated());
  return <div>CreateMessage page</div>;
};
export default CreateMessagePage;
