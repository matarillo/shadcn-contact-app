import { useParams } from "react-router";

export const useSelectedContact = () => {
  const urlParams = useParams<{ id: string }>();
  return parseInt(urlParams.id ?? "");
};
