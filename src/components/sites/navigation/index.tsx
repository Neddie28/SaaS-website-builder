import { ModeToggle } from '@/components/global/mode-toggle';
import { UserButton } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { currentUser } from '@clerk/nextjs';

type Props = {
    user?: null | User;
}

const Navigation = async ({ user }: Props) => {
  const loggedIn = await currentUser()
  return (
    <div className='fixed left-0 right-0 top-0 p-4 flex items-center justify-between z-10'>
      <aside className='flex items-center gap-2'>
        <Image 
            src={'./assets/plura-logo.svg'}
            alt='plura logo'
            width={40}
            height={40}
        />
        <span className='text-xl font-bold'>
            Levelupwork.
        </span>
      </aside>
      <nav className='hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
          <ul className='flex items-center justify-center gap-8'>
            <Link href={'#'}>
                Pricing
            </Link>
            <Link href={'#'}>
                About
            </Link>
            <Link href={'#'}>
                Documentaion
            </Link>
            <Link href={'#'}>
                Features
            </Link>
          </ul>
      </nav>
      <aside className='flex gap-2 items-center'>
        <Link href={'/agency'} className='bg-primary text-white px-4 p-2 rounded-md hover:bg-primary/80'>
          {loggedIn ? "Dashboard" : "Login"}
        </Link>
        <UserButton />
        <ModeToggle />
      </aside>
    </div>
  )
}

export default Navigation;