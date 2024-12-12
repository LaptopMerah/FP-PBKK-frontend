'use client';

import Dashboard from "@/app/dashboard";
import { TableParticipant } from "@/app/participant/data-table";
import { CreateModal } from "@/app/participant/modal-create";

export default function Participant() {
  return (
    <Dashboard breadcrumb="Participant">
      <div className="flex justify-between">
        <h1>All Particpant</h1>
        <CreateModal />
      </div>
      <TableParticipant />
    </Dashboard>
  );
}
  