import React, { useEffect, useState } from 'react';
import createAPIEndpoint, { ENDPOINTS } from "../API/api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = () => {
    const userEndpoint = createAPIEndpoint(ENDPOINTS.user);
    userEndpoint.fetch()
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li>{user.email} {user.fullname} {user.password}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;