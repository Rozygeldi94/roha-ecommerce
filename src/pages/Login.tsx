import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { SignIn } from "../components/SignIn";

export default function Login() {
  useDocumentTitle("Sign in | RoHa");
  return <SignIn />;
}
