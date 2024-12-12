'use client';

import Dashboard from "@/app/dashboard";
import { TableEvent } from "@/app/eventx/data-table";
import { CreateModal } from "@/app/eventx/modal-create";

export default function Event() {
  return (
    <Dashboard breadcrumb="Event">
      <div className="flex justify-between">
        <h1>All Event</h1>
        <CreateModal />
      </div>
      <TableEvent />
    </Dashboard>
  );
}
