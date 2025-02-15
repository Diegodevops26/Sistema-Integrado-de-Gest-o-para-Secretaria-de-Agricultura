import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
            <Link to="/" style={{ marginRight: '10px' }}>
                Home
            </Link>
            <Link to='/login'>Login</Link>
        </nav>
    );
};

export default Navbar;
