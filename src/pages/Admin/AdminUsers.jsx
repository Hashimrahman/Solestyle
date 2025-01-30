import { useContext } from "react";
import { ProductContext } from "../../components/Context/Product";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const { users, totalOrders, loadingTotalOrder } = useContext(ProductContext);

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
              .filter((item) => item.is_staff == false)
              .map((user) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  {loadingTotalOrder == true ? (
                    <td className="border border-gray-300 px-4 py-2">
                      Loading...
                    </td>
                  ) : (
                    <td className="border border-gray-300 px-4 py-2">
                      {
                        totalOrders.filter((item) => (item.user == user.id))
                          .length
                      }
                    </td>
                  )}

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
