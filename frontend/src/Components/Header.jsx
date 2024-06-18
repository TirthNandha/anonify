import React from 'react';

const Header = () => {
    return (
        <div className="header">
            <div className="left">App Name</div>
            <div className="center">
                <input type="text" placeholder="Search" className='search-field'/>
            </div>
            <div className="right">Profile Section</div>
        </div>
    );
};

export default Header;