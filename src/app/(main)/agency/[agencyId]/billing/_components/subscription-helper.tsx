"use client"
import SubscriptionFormWrapper from '@/components/forms/subscription-form/subscription-form-wrapper'
import CustomModal from '@/components/global/custom-modal'
import { PricesList } from '@/lib/type'
import { useModal } from '@/providers/modal-provider'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {
    prices: PricesList['data']
    customerId: string
    planExists: boolean
}

const SubscriptionHelper = ({ prices, customerId, planExists }: Props) => {
    const { setOpen } = useModal()
    const searchParams = useSearchParams()
    const plan = searchParams.get('plan')


    useEffect(() => {
        if (plan)
          setOpen(
            <CustomModal
              title="Upgrade Plan!"
              subheading="Get started today to get access to premium features"
            >
              <SubscriptionFormWrapper
                planExists={planExists}
                customerId={customerId}
              />
            </CustomModal>,
            async () => ({
              plans: {
                defaultPriceId: plan ? plan : '',
                plans: prices,
              },
            })
          )
      }, [plan, customerId, planExists, prices, setOpen])
    
  return (
    <div></div>
  )
}

export default SubscriptionHelper
