import { useState, type ReactNode } from "react";
import { AlertContext, type AlertState } from "./useAlertContext.ts";

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AlertState>({
    isOpen: false,
    type: 'success',
    message: '',
  });

  const onOpen = (type: 'success' | 'error', message: string) => 
    setState({ isOpen: true, type, message });
    
  const onClose = () => 
    setState({ isOpen: false, type: '', message: '' });

  return (
    <AlertContext.Provider value={{ ...state, onOpen, onClose }}>
      {children}
    </AlertContext.Provider>
  );
};