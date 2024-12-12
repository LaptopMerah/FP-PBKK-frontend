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
  useGetParticipant,
  useUpdateParticipant,
} from "@/app/api/hooks/participant-hook";
import { useGetAllEvent } from "@/app/api/hooks/event-hook";
import { getEvent } from "@/constant/utils/event";
import Link from "next/link";

const formSchema = z.object({
  id: z.number(),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  event_id: z.number(),
});

const ViolationDetailPage = ({ params }: { params: { id: number } }) => {
  const { data, isLoading } = useGetParticipant(params.id);
  const { data: eventList } = useGetAllEvent();
  const { mutate: updateParticipant } = useUpdateParticipant();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      name: "",
      email: "",
      event_id: 0,
    },
  });

  // Update form default values when data is fetched
  useEffect(() => {
    if (data) {
      form.reset({
        id: data.id,
        name: data.name,
        email: data.email,
        event_id: data.event_id,
      });
    }
  }, [data]);

  function onSubmit(formData: z.infer<typeof formSchema>) {
    updateParticipant(
      { ...formData },
      {
        onSuccess: () => {
          toast({
            title: "Participant updated successfully",
          });
        },
        onError: (error: any) => {
          toast({
            title: "Error updating participant",
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
          <h1 className="text-center">Edit Participant</h1>
          <div className="w-full rounded-xl bg-muted/50 p-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Iqbal Ramadhan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="event_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an event" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {eventList?.map((event: getEvent) => (
                        <SelectItem
                          key={event.id}
                          value={event.id.toString()}
                        >
                          {event.event_name} - {event.date}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full justify-between">

            <Link href="/participant/" className="w-[49%]">
              <Button size="lg" className="w-full" variant="outline">
                Back
              </Button>
            </Link>
            <Button type="submit" className="w-[49%]">Submit</Button>
          </div>
        </form>
      </Form>

    </section >

  );
};

export default ViolationDetailPage;
