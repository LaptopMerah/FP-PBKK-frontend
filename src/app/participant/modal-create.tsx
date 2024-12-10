import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
import { useCreateParticipant } from "@/app/api/hooks/participant-hook"
import { useGetAllEvent } from "@/app/api/hooks/event-hook"
import { getEvent } from "@/constant/utils/event"
const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  event_id: z.number(),
})
export function CreateModal() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      event_id: 0,
    },
  })
  const { data: eventList } = useGetAllEvent();
  const { mutate: createParticipant } = useCreateParticipant();

  function onSubmit(data: z.infer<typeof formSchema>) {
    createParticipant({ ...data }, {
      onSuccess: () => {
        toast({
          title: "Participant created successfully",
        });
        window.location.reload();
      },
      onError: (error: any) => {
        toast({
          title: "Error creating participant",
          description: error.message,
        });
      },
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg">Create Participant</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Participant</DialogTitle>
          <DialogDescription>
            Create a new Participant here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                  <Select onValueChange={field.onChange} value={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {eventList?.map((event: getEvent) => (
                        <SelectItem key={event.id} value={event.id}>
                          {event.event_name} - {event.date}
                        </SelectItem>
                      ))
                      }
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog >
  )
}
