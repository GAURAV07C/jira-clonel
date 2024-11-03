
'use client'
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { RxActivityLog } from "react-icons/rx";
const UserMenu = () => {
  return (
    <div>
      <UserButton 

      appearance={{
        elements:{
            avatarBox:'w-10 h-10'
        }
      }}
      
      >
      <UserButton.MenuItems>
        <UserButton.Link label='My Organisations' labelIcon={<RxActivityLog size={18} />}  href='/onboarding'/>
        <UserButton.Action label='manageAccount' />
      </UserButton.MenuItems>

      </UserButton>
      

    </div>
  )
}

export default UserMenu
