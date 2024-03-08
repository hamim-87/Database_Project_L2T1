// pages/admin/layout.js

import React from "react";

// Admin-specific layout (without Navbar)
const AdminLayout = ({ children }) => (
  <html lang="en">
    <body>
      {/* Exclude Navbar */}
      {children}
    </body>
  </html>
);

export default AdminLayout;
