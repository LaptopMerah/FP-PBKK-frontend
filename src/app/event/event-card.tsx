"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import { BellRing, Check, ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useDeleteEvent, useGetAllEvent } from "@/app/api/hooks/event-hook";
// import { getParticipant } from "@/constant/utils/participant"
import { getEvent } from "@/constant/utils/event";

let router: ReturnType<typeof useRouter>;
const handleEdit = (row: any) => {
  router.push(`/user/${row.getValue("id")}`);

}
let deleteViolation: any;
const handleDelete = async (row: any) => {
  await deleteViolation(row.getValue("id"));  
  window.location.reload();
};

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  }
];


export const columns: ColumnDef<getEvent>[] = [
  {
    accessorKey: "event_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Event Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            {row.getValue("event_name")}
          </h3>
        </div>
        <div className="card-body">
          <p>{`Event ID: ${row.original.id}`}</p>
          <p>{`Date: ${row.original.date}`}</p>
          <p>{`Location: ${row.original.location}`}</p>
          <p>{`Details: ${row.original.details}`}</p>
        </div>
        {/* <div className="card-footer">
          <Button onClick={() => handleDetails(row.original)}>Details</Button>
        </div> */}
      </div>
    ),
  },
  {
    accessorKey: "id",
    enableHiding: false,
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem
              onClick={() => handleEdit(row)}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600"
              onClick={() => handleDelete(row)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];



export function CardDemo({ className, ...props }: React.ComponentProps<typeof Card>) {
  const { data, isLoading, error } = useGetAllEvent();
  
  router = useRouter();
  const { mutateAsync } = useDeleteEvent();
  deleteViolation = mutateAsync;
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const searchValue = event.target.value.toLowerCase();
  //   if (searchValue) {
  //     const filteredEvents = data?.filter((event) =>
  //       event.name.toLowerCase().includes(searchValue)
  //     );
  //     props.onFilterChange(filteredEvents?.map((event) => event.name) as string[]);
  //   } else {
  //     props.onFilterChange(data?.map((event) => event.name) as string[]);
  //   }
  // };

  return (
    <div className="w-full rounded-xl bg-muted/50 px-5">
      <div className="flex items-center py-4">
        <Input
          type="text"
          placeholder="Filter event name..."
          // onChange={handleFilterChange}
          className="max-w-sm"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuCheckboxItem
              checked={columnVisibility.name}
              onCheckedChange={(value) =>
                setColumnVisibility({ name: value })
              }
            >
              Name
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>

        <Card className={cn("w-[380px]", className)} {...props}>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>

            <CardDescription>You have 3 unread messages.</CardDescription>

          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="flex items-center space-x-4 rounded-md border p-4">
              <BellRing />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Push Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Send notifications to your device.
                </p>
              </div>
              <Switch />
            </div>
            <div>
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <Check /> Mark all as read
            </Button>
          </CardFooter>
        </Card>
    </div>
  );
}


