import '../styles/Layout.css';

import { FiLayout, FiSettings } from 'react-icons/fi';
import { GoDatabase } from "react-icons/go";
import { IoLogOutOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';

import siteLogo from '../assets/sitelogo.png'
import { logout } from '../redux/slices/AuthSlice'
function Layout({ children }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/login')
    };
    return (
        <div className="layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <img src={siteLogo} alt="logo" />
                    <h1>Pro Manage</h1>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><NavLink to="/board" ><FiLayout /> Board</NavLink></li>
                        <li><NavLink to="/analytics"><GoDatabase /> Analytics</NavLink></li>
                        <li><NavLink to="/settings" ><FiSettings /> Settings</NavLink></li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout}><IoLogOutOutline /> Log out</button>
                </div>
            </aside>
            <main className="main-content">
                {children}
            </main>
        </div>
    );
}

export default Layout;
