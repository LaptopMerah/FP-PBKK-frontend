'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardBody, CardFooter, CardHeader } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

import { useDeleteEvent, useGetAllEvent } from '@/app/api/hooks/event-hook';
import { getEvent } from '@/constant/utils/event';

let router: ReturnType<typeof useRouter>;
const handleEdit = (row: any) => {
  router.push(`/event/${row.getValue('id')}`);
};
let deleteViolation: any;
const handleDelete = async (row: any) => {
  await deleteViolation(row.getValue('id'));
  window.location.reload();
};

const columns: ColumnDef<getEvent>[] = [
  {
    accessorKey: 'event_name',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('event_name')}</div>,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Date
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue('date')}</div>,
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Location
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className='text-center'>{row.getValue('location')}</div>
    ),
  },
  {
    accessorKey: 'details',
    header: ({ column }) => (
      <Button
        variant='ghost'
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Details
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className='text-justify'>{row.getValue('details')}</div>
    ),
  },
  {
    accessorKey: 'id',
    enableHiding: false,
    header: () => <div>Actions</div>,
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='center'>
          <DropdownMenuItem onClick={() => handleEdit(row)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className='text-red-600'
            onClick={() => handleDelete(row)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export function CardDemo() {
  const { data, isLoading, error } = useGetAllEvent();
  router = useRouter();
  const { mutateAsync } = useDeleteEvent();
  deleteViolation = mutateAsync;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: data ?? [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='w-full rounded-xl bg-muted/50 px-5'>
      <h1 className='flex items-center justify-center py-7 pb-2 text-justify'>
        WELCOME TO EVENT MANAGEMENT
      </h1>

      <div className='flex items-center py-4 pb-7'>
        <Input
          placeholder='Filter Event Name...'
          value={
            (table.getColumn('event_name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('event_name')?.setFilterValue(event.target.value)
          }
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {data?.map((event) => (
          <Card
            key={event.id}
            className='flex flex-col h-full shadow-lg border border-gray-700'
          >
            <CardHeader className='bg-muted p-4 text-xl font-bold text-center'>
              {event.event_name}
            </CardHeader>
            <CardBody className='p-4 flex-grow'>
              <div className='m-4'>
                <strong>Date:</strong> {event.date}
              </div>
              <div className='m-4'>
                <strong>Location:</strong> {event.location}
              </div>
              <div className='m-4'>
                <strong>Details:</strong> {event.details}
              </div>
            </CardBody>
            <CardFooter className='flex justify-between p-4 mt-auto'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => handleEdit(event)}
              >
                Edit
              </Button>
              <Button
                variant='outline'
                size='sm'
                className='text-red-600'
                onClick={() => handleDelete(event)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
