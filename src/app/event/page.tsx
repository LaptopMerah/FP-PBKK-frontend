'use client';

import Dashboard from "@/app/dashboard";
import { CardDemo } from "@/app/event/event-card";
import { CreateModal } from "@/app/event/modal-create"


export default function Event() {
  return (
    <Dashboard breadcrumb="Event">
      <div className="flex justify-between">
        <h1>All Event</h1> 
        <CreateModal />
      </div>
      
      <CardDemo />

      {/* <div className="flex flex-col gap-4 md:flex-row">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
    
    </Dashboard>
  );

}


