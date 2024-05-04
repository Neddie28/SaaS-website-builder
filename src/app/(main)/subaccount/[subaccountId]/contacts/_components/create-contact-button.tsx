"use client"
import ContactUserForm from '@/components/forms/contact-user-form'
import CustomModal from '@/components/global/custom-modal'
import { useModal } from '@/providers/modal-provider'
import React from 'react'

type Props = {
    subaccountId: string
}

const CreateContactButton = ({subaccountId}: Props) => {
    const { setOpen } = useModal()

    const handleCreateButton = () => {
        setOpen(
            <CustomModal
                title='Create Or Update Contact information'
                subheading='Contacts are like customers.'
            >
                <ContactUserForm subaccountId={subaccountId}/>
            </CustomModal>
        )
    }
  return (
    <div>CreateContactButton</div>
  )
}

export default CreateContactButton