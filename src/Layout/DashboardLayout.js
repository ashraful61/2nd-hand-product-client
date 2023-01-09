import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useUserRole from '../hooks/useUserRole';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    const [userRole] = useUserRole(user?.email);
    console.log(userRole)
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-base-content">
                        <li><Link to="/dashboard">My Orders</Link></li>
                        {
                            userRole ==='admin' && <>
                                <li><Link to="/dashboard/allUsers">All users</Link></li>
                            </>
                        }
                             {
                            userRole ==='seller' && <>
                               
                                <li><Link to="/dashboard/addProduct">Add A Product</Link></li>
                                <li><Link to="/dashboard/myProducts">My Products</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;