import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Contact } from "@/types";
import { useSelectedContact } from "@/hooks";

type Props = {
  contacts: Contact[];
  newContact: () => Contact;
  handleSave: (editingContact: Contact) => void;
  handleCancel: () => void;
};

function EditContact({
  contacts,
  newContact,
  handleSave,
  handleCancel,
}: Props) {
  const selectedContact = useSelectedContact(contacts);
  const [contactToEdit, isNew] =
    selectedContact == null ? [newContact(), true] : [selectedContact, false];
  const [editingContact, setEditingContact] = useState<Contact>(contactToEdit);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{isNew ? "新規連絡先の追加" : "連絡先の編集"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="avatar">アバター画像URL</Label>
          <Input
            id="avatar"
            value={editingContact.avatar}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditingContact({ ...editingContact, avatar: e.target.value })
            }
            placeholder="画像URLを入力してください"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name">名前</Label>
          <Input
            id="name"
            value={editingContact.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEditingContact({ ...editingContact, name: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="twitter">Twitterアカウント</Label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
              @
            </span>
            <Input
              id="twitter"
              className="rounded-l-none"
              value={editingContact.twitter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditingContact({
                  ...editingContact,
                  twitter: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">メモ</Label>
          <Textarea
            id="notes"
            rows={4}
            value={editingContact.notes}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setEditingContact({ ...editingContact, notes: e.target.value })
            }
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel}>
          キャンセル
        </Button>
        <Button onClick={() => handleSave(editingContact)}>保存</Button>
      </CardFooter>
    </Card>
  );
}

export default EditContact;
