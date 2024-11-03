'use client'
import { useOrganization, useUser } from '@clerk/nextjs'
import React from 'react'
import {BarLoader} from 'react-spinners'
export const UserLoading = () => {
    const {isLoaded} = useOrganization()
    const {isLoaded : isUserLoaded} = useUser()
    
    if(!isLoaded || !isUserLoaded){
        return (
            <div>
              <BarLoader className='mb-4' width={'100%'} color='#36d7b7' />
            </div>
          )
    }else {
        <></>
    }

  
}

export default UserLoading
