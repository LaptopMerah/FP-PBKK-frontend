'use client';

import Dashboard from '@/app/dashboard';
import { CardDemo } from '@/app/event/event-card';
import { CreateModal } from '@/app/event/modal-create';

export default function Event() {
  return (
    <Dashboard breadcrumb='Event'>
      <div className='flex justify-between'>
        <h1>All Event</h1>
        <CreateModal />
      </div>
      <CardDemo />
    </Dashboard>
  );
}
