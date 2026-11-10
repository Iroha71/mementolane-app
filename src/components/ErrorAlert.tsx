import { InfoIcon } from "lucide-react";
import { Alert, AlertTitle } from "./ui/alert";

interface ErrorAlertProps {
  message: string;
}

export default function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <Alert variant="destructive" className="w-fit max-w-full">
      <InfoIcon />
      <AlertTitle>{message}</AlertTitle>
    </Alert>
  );
}
