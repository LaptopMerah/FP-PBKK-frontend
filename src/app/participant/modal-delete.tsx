import { useDeleteParticipant } from "@/app/api/hooks/participant-hook";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";


type IProps = { id: number };

export function AlertDelete({ id }: IProps) {
  const { mutateAsync } = useDeleteParticipant();
  const deleteViolation = mutateAsync;
  const handleDelete = async () => {
    await deleteViolation(id);
    window.location.reload();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>        <Button size="icon" variant="ghost">    <Trash2 className="text-red-600" /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete()}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
