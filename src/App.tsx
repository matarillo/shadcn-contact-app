import { JSX, useState } from "react";
import { Routes, Route, useNavigate } from "react-router";
import Sidebar from "@/pages/Sidebar";
import Top from "@/pages/Top";
import ShowContact from "@/pages/ShowContact";
import EditContact from "@/pages/EditContact";
import { Contact, ContactStore } from "@/types";

const initialContacts: Contact[] = [
  {
    id: 1,
    name: "山田 太郎",
    twitter: "yamada_taro",
    notes: "会社の同僚。プロジェクトマネージャー。",
    avatar:
      "https://gist.githubusercontent.com/matarillo/700a5a65e58d596d3e41fafde0f5e80b/raw/6b2ffcb72339b58ff5ca96ccbab19198c9a1a1a6/img04.jpg",
    favorite: true,
  },
  {
    id: 2,
    name: "佐藤 花子",
    twitter: "hanako_design",
    notes: "デザイナー。Figmaのエキスパート。",
    avatar:
      "https://gist.githubusercontent.com/matarillo/700a5a65e58d596d3e41fafde0f5e80b/raw/6b2ffcb72339b58ff5ca96ccbab19198c9a1a1a6/img11.jpg",
    favorite: false,
  },
  {
    id: 3,
    name: "鈴木 健太",
    twitter: "kenta_dev",
    notes: "フリーランスエンジニア。React専門。",
    avatar:
      "https://gist.githubusercontent.com/matarillo/700a5a65e58d596d3e41fafde0f5e80b/raw/6b2ffcb72339b58ff5ca96ccbab19198c9a1a1a6/img10.jpg",
    favorite: true,
  },
];

function useContactStore(): ContactStore {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  return {
    contacts,
    getContact(id: number) {
      return contacts.find((c) => c.id === id);
    },
    addContact(contact: Contact) {
      setContacts((prev) => [...prev, contact]);
    },
    updateContact(contact: Contact) {
      setContacts((prev) =>
        prev.map((c) => (c.id === contact.id ? contact : c)),
      );
    },
    deleteContact(id: number) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
    },
    toggleFavorite(id: number) {
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, favorite: !c.favorite } : c)),
      );
    },
  };
}

function App() {
  const contactStore: ContactStore = useContactStore();
  const navigate = useNavigate();

  const sidebarProps = {
    store: contactStore,
    handleSelect: (c: Contact): void => {
      navigate(`/contacts/${c.id}`);
    },
    handleAddNew: (): void => {
      navigate(`/contacts/new`);
    },
  };

  const showContactProps = {
    store: contactStore,
    handleToggleFavorite: (selectedContact: Contact) => {
      contactStore.toggleFavorite(selectedContact.id);
    },
    handleEdit: (contactToEdit: Contact) => {
      navigate(`/contacts/${contactToEdit.id}/edit`);
    },
    handleDelete: (contactToDelete: Contact) => {
      contactStore.deleteContact(contactToDelete.id);
      navigate(`/`);
    },
  };

  const editContactProps = {
    store: contactStore,
    newContact: () => ({
      id: Date.now(),
      name: "",
      twitter: "",
      notes: "",
      avatar: "/api/placeholder/40/40",
      favorite: false,
    }),
    handleSave: (editingContact: Contact) => {
      if (contactStore.getContact(editingContact.id)) {
        contactStore.updateContact(editingContact);
      } else {
        contactStore.addContact(editingContact);
      }
      navigate(`/contacts/${editingContact.id}`);
    },
    handleCancel: () => {
      navigate(-1);
    },
  };

  const renderContents = (main: JSX.Element) => {
    return (
      <div className="flex flex-1 overflow-hidden pt-4 gap-4">
        <aside className="w-64 border rounded-lg flex flex-col bg-gray-50 shadow-sm">
          <Sidebar {...sidebarProps} />
        </aside>
        <main className="flex-1 overflow-auto p-6">{main}</main>
      </div>
    );
  };

  return (
    <div className="p-6 flex flex-col h-screen">
      {/* ヘッダー */}
      <header className="pb-4 border-b">
        <h1 className="text-xl font-bold text-blue-600">連絡先アプリ</h1>
      </header>
      <Routes>
        <Route path="/" element={renderContents(<Top />)} />
        <Route
          path="/contacts/:id"
          element={renderContents(<ShowContact {...showContactProps} />)}
        />
        <Route
          path="/contacts/:id/edit"
          element={renderContents(<EditContact {...editContactProps} />)}
        />
        <Route
          path="/contacts/new"
          element={renderContents(<EditContact {...editContactProps} />)}
        />
      </Routes>
    </div>
  );
}

export default App;
