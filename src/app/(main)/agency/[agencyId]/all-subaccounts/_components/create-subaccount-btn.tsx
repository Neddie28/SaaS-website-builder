"use client"

import SubAccountDetails from '@/components/forms/subaccount-details'
import CustomModal from '@/components/global/custom-modal'
import { Button } from '@/components/ui/button'
import { useModal } from '@/providers/modal-provider'
import { Agency, AgencySidebarOption, SubAccount, User } from '@prisma/client'
import { PlusCircleIcon } from 'lucide-react'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import {  agencySubscription, getAuthUserDetails } from '@/lib/queries'
import clsx from 'clsx'

type Props = {
    user: User & {
        Agency: | (
            |Agency 
            | (null & {
            SubAccount: SubAccount[]
            SideBarOption: AgencySidebarOption[]
        })
        )
        | null
    }
    id: string
    className: string
    agencyId: string
   
    
    // agency: Agency & {
    //     SubAccount: SubAccount[]
    // }
}

const CreateSubAccountButton = async ({ className, id, user, agencyId }: Props) => {
    const { setOpen } = useModal()
    const agencyDetails = user.Agency

    if(!user) return



    if(!agencyDetails) return
    //console.log(agency?.SubAccount?.length)

    // if(agency?.SubAccount?.length >= 3) {
    //     return (
    //         toast({
    //             title: 'Upgrade to a higer plan',
    //             description: 'cant create subaccount',
    //           })
    //     )
    // }

// const starter = await agencySubscription(agencyId)

  return (
   <Button 
         className={clsx(twMerge("w-full flex gap-4", className)
          )}
        onClick={() => {
            setOpen(
            <CustomModal
                title='Create a Subaccount'
                subheading='You can switch between'
            >
                <SubAccountDetails 
                    agencyDetails={agencyDetails}
                    userId={user.id}
                    userName={user.name}
                />
            </CustomModal>
        )
        }}
   >
        <PlusCircleIcon />
        Create Sub account
   </Button>
  )
}

export default CreateSubAccountButton

//twMerge("w-full flex gap-4", className)
