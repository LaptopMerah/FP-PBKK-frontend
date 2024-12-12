'use client';

import Dashboard from "@/app/dashboard";
import { CreateModal } from "@/app/eventx/modal-create";
import { CardDemo } from "@/app/event/event-card";

export default function Event() {
  return (
    <Dashboard breadcrumb="Event">
      <div className="flex justify-between">
        <h1>All Event</h1>
        <CreateModal />
      </div>
      <CardDemo />
    </Dashboard>
  );
}
