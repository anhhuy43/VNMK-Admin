import React from 'react';
import { CContainer, CHeader, CFooter, CSidebar, CNav, CNavItem, CNavLink } from '@coreui/react';

const Layout = ({ children }) => {
  return (
    <div>
      <CSidebar>
        <CNav>
          <CNavItem>
            <CNavLink href="/">Dashboard</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/posts">Manage Posts</CNavLink>
          </CNavItem>
        </CNav>
      </CSidebar>
      <div className="wrapper d-flex flex-column">
        <CHeader>Admin Dashboard</CHeader>
        <CContainer className="flex-grow-1">{children}</CContainer>
        <CFooter>© 2024 Admin Panel</CFooter>
      </div>
    </div>
  );
};

export default Layout;
