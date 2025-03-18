export interface Contact {
  id: number;
  name: string;
  twitter: string;
  notes: string;
  avatar: string;
  favorite: boolean;
}

export interface ContactStore {
  contacts: Contact[];
  getContact: (id: number) => Contact | undefined;
  addContact: (contact: Contact) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (id: number) => void;
  toggleFavorite: (id: number) => void;
}
