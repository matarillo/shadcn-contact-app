import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Contact } from "@/types.ts";

type Props = {
  contactToDelete: Contact;
  isOpen: boolean;
  handleCancel: () => void;
  handleDelete: () => void;
};

function DeleteDialog({
  contactToDelete,
  isOpen,
  handleCancel,
  handleDelete,
}: Props) {
  const handleOpenChange = (open: boolean): void => {
    if (!open) {
      handleCancel();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>連絡先を削除しますか？</DialogTitle>
          <DialogDescription>
            「{contactToDelete?.name}」を削除します。この操作は元に戻せません。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleCancel()}>
            キャンセル
          </Button>
          <Button variant="destructive" onClick={() => handleDelete()}>
            削除する
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
