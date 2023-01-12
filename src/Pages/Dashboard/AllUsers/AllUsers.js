import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

const AllUsers = () => {

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      return data;
    },
  });


  const handleDeleteUserPopUp = (user) => {
    Swal.fire({
      title: `Do you want to delete ${user?.name}`,
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteUser(user)
      }
    })
  }

  const handleDeleteUser = (user) => {
    fetch(`http://localhost:5000/users/${user._id}`, {
      method: 'DELETE', 
      headers: {
          authorization: `bearer ${localStorage.getItem('accessTokenUseProduct')}`
      }
  })
  .then(res => res.json())
  .then(data => {
      if(data.deletedCount > 0){
          refetch();
          toast.success(`${user.name} deleted successfully`)
      }
  })
  }
  return (
    <div>
      <h2 className="text-3xl">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>User Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleDeleteUserPopUp(user)} className="btn btn-sm btn-danger">Delete</button> &nbsp;
                 { user?.role === 'seller' && <button className="btn btn-sm btn-info">Verify</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
