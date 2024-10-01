import { useContext } from "react";
import { ProductContext } from "../../components/Context/Product";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const { users } = useContext(ProductContext);

  return (
    <div>
      <h1>Users</h1>
      <div className="w-full">
        <table className="w-full border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Id</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Orders</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((item) => item.fullName != "Admin")
              .map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.fullName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.orders ? user.orders.length : 0}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Link to={`/user/${user.id}`}> View More</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
