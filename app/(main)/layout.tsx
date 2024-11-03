
import React, { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode;
  }
  
  const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className=' container mx-auto mt-5'>
      {children}
    </div>
  )
}

export default Layout
