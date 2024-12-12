"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import {
  useGetEvent,
  useUpdateEvent,
} from "@/app/api/hooks/event-hook";
import { useGetAllEvent } from "@/app/api/hooks/event-hook";
import { getEvent } from "@/constant/utils/event";
import Link from "next/link";

const formSchema = z.object({
  id: z.number(),
  event_name: z.string().min(2).max(50),
  date: z.string(),
  location: z.string().min(2).max(50),
  details: z.string().min(2).max(500),
});

const ViolationDetailPage = ({ params }: { params: { id: number } }) => {
  const { data, isLoading } = useGetEvent(params.id);
  const { data: eventList } = useGetAllEvent();
  const { mutate: updateEvent } = useUpdateEvent();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      event_name: "",
      date: "",
      location: "",
      details: ""
    },
  });

  // Update form default values when data is fetched
  useEffect(() => {
    if (data) {
      form.reset({
        id: data.id,
        event_name: data.event_name,
        date: data.date,
        location: data.location,
        details: data.details
      });
    }
  }, [data]);

  function onSubmit(formData: z.infer<typeof formSchema>) {
    updateEvent(
      { ...formData },
      {
        onSuccess: () => {
          toast({
            title: "Event updated successfully",
          });
          window.location.href = "/eventx/";
        },
        onError: (error: any) => {
          toast({
            title: "Error updating event",
            description: error.message,
          });
        },
      }
    );
  }

  return (
    <section className="max-w-screen-md h-full flex flex-col m-auto items-center justify-center gap-5 mt-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-5">
          <h1 className="text-center">Edit Event</h1>
          <div className="w-full rounded-xl bg-muted/50 p-5">
            <FormField
              control={form.control}
              name="event_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Event Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Event Location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Event Details"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-between">

            <Link href="/eventx/" className="w-[49%]">
              <Button size="lg" className="w-full" variant="outline">
                Back
              </Button>
            </Link >
            
            <Button type="submit" className="w-[49%]">
              Submit
            </Button>
          </div>
        </form>
      </Form>

    </section >

  );
};

export default ViolationDetailPage;
