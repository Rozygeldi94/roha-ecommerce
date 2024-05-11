import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SignUp } from "../components/Register";

export default function Register() {
  useDocumentTitle("Sign up | RoHa");
  return <SignUp />;
}
