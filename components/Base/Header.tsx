import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { FaRegPenToSquare } from "react-icons/fa6";
import UserMenu from './User-menu'
import { cheakUser } from '@/lib/cheakUser'
import UserLoading from '../User-loading'

const Header = async () => {
  await cheakUser()


  return (
    
    <header className=' container mx-auto'>
        <nav className='py-6 px-4 flex justify-between items-center'>
          <Link href='/'>
          <Image src={'/logo2.png'} alt='zcrum logo' width={200} height={56} className='h-10 w-auto object-contain' />
          </Link>
    
        <div className='flex items-center gap-4'>
          <Link href='/project/create' >
          <Button variant='destructive' className='flex items-center gap-2'>
          <FaRegPenToSquare size={18}  />
            <span>Create Project</span>
          </Button>
          </Link>
      <SignedOut>
        <SignInButton forceRedirectUrl='onboarding' >
          <Button variant='ghost'>Login</Button>


        </SignInButton>
      </SignedOut>

      <SignedIn>
        <UserMenu/>
        
      </SignedIn>
    </div>
        </nav>
        <UserLoading />
      </header>
  )
}

export default Header
