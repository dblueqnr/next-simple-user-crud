import User from "../../components/user";
import { loadUsersById } from "../../services/apiRequest";
export default function UserID(user) {
  return <User data={user} />;
}
UserID.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return {};
  }
  return await loadUsersById(query.id);
};
