import { useState } from "react";
import { Star, Edit, Trash2 } from "lucide-react";
import { SiX } from "@icons-pack/react-simple-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import DeleteDialog from "@/pages/DeleteDialog";
import { Contact } from "@/types";
import { useSelectedContact } from "@/hooks";

type Props = {
  contacts: Contact[];
  handleToggleFavorite: (selectedContact: Contact) => void;
  handleEdit: (contactToEdit: Contact) => void;
  handleDelete: (contactToDelete: Contact) => void;
};

function ShowContact({
  contacts,
  handleToggleFavorite,
  handleEdit,
  handleDelete,
}: Props) {
  const selectedContact = useSelectedContact(contacts);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  if (selectedContact == null) {
    return <></>;
  } else {
    const deleteDialogProps = {
      contactToDelete: selectedContact,
      isOpen: isDialogOpen,
      handleCancel: () => {
        setIsDialogOpen(false);
      },
      handleDelete: () => {
        setIsDialogOpen(false);
        handleDelete(selectedContact);
      },
    };

    return (
      <>
        <Card className="max-w-2xl mx-auto overflow-hidden">
          <div className="flex flex-row p-4">
            {/* 左側40%エリア（アバター） */}
            <div className="w-2/5 p-6 flex items-center justify-center">
              <Avatar className="h-64 w-64">
                <AvatarImage
                  src={selectedContact.avatar || "/api/placeholder/40/40"}
                  alt={selectedContact.name}
                />
                <AvatarFallback className="text-6xl">
                  {selectedContact.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* 右側60%エリア（情報） */}
            <div className="w-3/5 flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">
                    {selectedContact.name}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleToggleFavorite(selectedContact)}
                  >
                    <Star
                      className={`h-5 w-5 ${selectedContact.favorite ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`}
                    />
                  </Button>
                </div>
                <CardDescription>
                  <a
                    href={`https://twitter.com/${selectedContact.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-500 hover:underline"
                  >
                    <SiX className="h-4 w-4" />@{selectedContact.twitter}
                  </a>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="whitespace-pre-wrap">{selectedContact.notes}</p>
              </CardContent>

              <CardFooter className="flex justify-end gap-2 mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(selectedContact)}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  編集
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  削除
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
        <DeleteDialog {...deleteDialogProps}></DeleteDialog>
      </>
    );
  }
}

export default ShowContact;
