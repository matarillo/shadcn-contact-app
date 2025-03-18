import React, { useState } from "react";
import { Search, Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Contact } from "@/types";
import { useSelectedContact } from "@/hooks";

type Props = {
  contacts: Contact[];
  handleSelect: (contact: Contact) => void;
  handleAddNew: () => void;
};

function Sidebar({ contacts, handleSelect, handleAddNew }: Props) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const selectedContact = useSelectedContact(contacts);
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.twitter.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.notes.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div className="p-3 border-b flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="連絡先を検索..."
            className="pl-8"
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
          />
        </div>
        <Button size="icon" onClick={handleAddNew}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <ul className="divide-y">
          {filteredContacts.map((contact) => (
            <li
              key={contact.id}
              className={`p-3 cursor-pointer hover:bg-gray-100 flex items-center gap-3 ${selectedContact?.id === contact.id ? "bg-blue-50 border-l-4 border-blue-500" : ""}`}
              onClick={() => handleSelect(contact)}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={contact.avatar || "/api/placeholder/40/40"}
                  alt={contact.name}
                />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{contact.name}</p>
                <p className="text-sm text-gray-500 truncate">
                  @{contact.twitter}
                </p>
              </div>
              {contact.favorite && (
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
