import { createContext, useContext } from "react";

// 1. Define types here so they can be exported
export interface AlertState {
  isOpen: boolean;
  type: 'success' | 'error' | '';
  message: string;
}

export interface AlertContextType extends AlertState {
  onOpen: (type: 'success' | 'error', message: string) => void;
  onClose: () => void;
}

// 2. Create the context
export const AlertContext = createContext<AlertContextType | undefined>(undefined);

// 3. The Hook
export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlertContext must be used within an AlertProvider");
  }
  return context;
};