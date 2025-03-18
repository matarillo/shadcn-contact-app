import { useParams } from "react-router";
import { Contact } from "@/types";

export const useSelectedContact = (contacts: Contact[]) => {
  const urlParams = useParams<{ id: string }>();
  const selectedId = parseInt(urlParams.id ?? "");
  return contacts.find((c) => c.id == selectedId);
};
