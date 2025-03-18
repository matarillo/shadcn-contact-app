import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Contact } from "@/types.ts";

type Props = {
  contactToDelete: Contact;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handleDelete: () => void;
};

function DeleteDialog({
  contactToDelete,
  isOpen,
  setIsOpen,
  handleDelete,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>連絡先を削除しますか？</DialogTitle>
          <DialogDescription>
            「{contactToDelete?.name}」を削除します。この操作は元に戻せません。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">キャンセル</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={handleDelete}>
              削除する
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
