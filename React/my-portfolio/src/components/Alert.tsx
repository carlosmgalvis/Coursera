import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
} from "@chakra-ui/react";
import { useAlertContext } from "../context/useAlertContext.ts";
import { useRef } from "react";

/**
 * Global component using Chakra UI v3 Dialog components
 */
function Alert() {
  const { isOpen, type, message, onClose } = useAlertContext();
  
  // FIX: Provide a type to useRef and initialize with null
  const cancelRef = useRef<HTMLButtonElement>(null);
  
  const isSuccess = type === "success";

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={onClose}
      initialFocusEl={() => cancelRef.current}
    >
      <DialogContent 
        py={4} 
        backgroundColor={isSuccess ? '#81C784' : '#FF8A65'}
        color="white"
      >
        <DialogHeader>
          <DialogTitle fontSize="lg" fontWeight="bold">
            {isSuccess ? 'All good!' : 'Oops!'}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>{message}</DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}

export default Alert;