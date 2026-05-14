import * as React from "react";
import { VStack, type StackProps } from "@chakra-ui/react";
/**
 * Illustrates the use of children prop and spread operator
 */
const FullScreenSection = ({ 
  children, 
  isDarkBackground, 
  ...boxProps 
}: FullScreenSectionProps) => { // 2. Apply the interface here
  return (
    <VStack
      backgroundColor={boxProps.backgroundColor}
      color={isDarkBackground ? "white" : "black"}
      // Spread the rest of the props (width, height, etc.)
      width="100%" 
    >
      <VStack maxWidth="1280px" minHeight="100vh" {...boxProps}>
        {children}
      </VStack>
    </VStack>
  );
};
export default FullScreenSection;
// 1. Define the interface for your props
interface FullScreenSectionProps extends StackProps {
  children: React.ReactNode;      // Type for anything that can be rendered
  isDarkBackground: boolean;      // Type for the true/false toggle
}