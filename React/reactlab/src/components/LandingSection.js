import React from "react";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const greeting = "Hello, I am Carlos!";
const bio1 = "A frontend developer";
const bio2 = "specialized in React";

// Implement the UI for the LandingSection component according to the instructions.
// Use a combination of Avatar, Heading and VStack components.
const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
    <VStack spacing={4}>
      {/* Avatar component with the specified URL */}
      <Avatar 
        src="https://i.pravatar.cc/150?img=7" 
        size="2xl" 
        name="Carlos" 
      />
      
      {/* Greeting - using a smaller heading size for the intro */}
      <Heading as="h4" size="md" noOfLines={1}>
        {greeting}
      </Heading>

      {/* Bio - using larger headings for the role description */}
      <VStack spacing={1}>
        <Heading as="h1" size="2xl" noOfLines={1}>
          {bio1}
        </Heading>
        <Heading as="h1" size="2xl" noOfLines={1}>
          {bio2}
        </Heading>
      </VStack>
    </VStack>
  </FullScreenSection>
);

export default LandingSection;