import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { db } from '@/lib/db'
import { getLaneWithTicketAndTags, getPipelineDetails, updateLanesOrder, updateTicketsOrder } from '@/lib/queries'
import { LaneDetail } from '@/lib/type'
import { redirect } from 'next/navigation'
import React from 'react'
import PipelineInforbar from '../_components/pipeline-infobar'
import PipelineSettings from '../_components/pipeline-settings'
import PipelineView from '../_components/pipeline-view'

type Props = {
    params: {
        subaccountId: string;
        pipelineId: string
    }
}

const PipelinePage = async ({ params }: Props) => {
    const pipelineDetails = await getPipelineDetails(params.pipelineId)

    if(!pipelineDetails)
        return redirect(`/subaccount/${params.subaccountId}/pipelines`)
    

    const pipelines = await db.pipeline.findMany({
        where: {
            subAccountId: params.subaccountId
        },
    })

    const lanes = ( await getLaneWithTicketAndTags(
        params.pipelineId
    )) as LaneDetail[]
    
  return (
    <Tabs 
        defaultValue='view'
        className='w-full'
    >
        <TabsList
            className="bg-transparent border-b-2 h-16 w-full justify-between mb-4"
        >
            <PipelineInforbar 
                pipelineId={params.pipelineId}
                pipelines={pipelines}
                subAccountId={params.subaccountId}
            />
            <div>
                <TabsTrigger
                    value='view'
                >
                    Pipeline View
                </TabsTrigger>
                <TabsTrigger
                    value='settings'
                >
                    Settings
                </TabsTrigger>
            </div>
        </TabsList>
        <TabsContent value='view'>
            <PipelineView
                lanes={lanes}
                pipelineDetails={pipelineDetails}
                pipelineId={params.pipelineId}
                subaccountId={params.subaccountId}
                updateLanesOrder={updateLanesOrder}
                updateTicketsOrder={updateTicketsOrder}
            />
        </TabsContent>
        <TabsContent value='settings'>
            <PipelineSettings 
                pipelineId={params.pipelineId}
                pipelines={pipelines}
                subaccountId={params.subaccountId}
            />
        </TabsContent>
    </Tabs>
  )
}

export default PipelinePage