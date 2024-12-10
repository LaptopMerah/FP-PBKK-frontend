'use client';

import { useGetAllParticipant } from "@/app/api/hooks/participant-hook";
import Dashboard from "@/app/dashboard";
import { CreateModal } from "@/app/participant/modal-create";
import { TableParticipant } from "@/app/participant/data-table";

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
