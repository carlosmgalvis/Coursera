import { Heading, VStack } from "@chakra-ui/react";
// Import the Avatar components from your generated UI folder
import { Avatar } from "./ui/avatar"; 
import FullScreenSection from "./FullScreenSection";

const greeting = "Hello, I am Carlos!";
const bio1 = "A frontend developer";
const bio2 = "specialized in React";

const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
    <VStack gap={6}>
      {/* 1. Fixed Avatar: In v3, we use the Avatar snippet wrapper */}
      <Avatar 
        src="https://i.pravatar.cc/150?img=7" 
        name="Carlos" 
        size="2xl" 
        shape="rounded"
      />
      
      {/* 2. Greeting */}
      <Heading as="h4" size="md" color="white">
        {greeting}
      </Heading>

      {/* 3. Bio - Using color="white" to ensure visibility on dark background */}
      <VStack gap={1}>
        <Heading as="h1" size="3xl" textAlign="center" color="white">
          {bio1}
        </Heading>
        <Heading as="h1" size="3xl" textAlign="center" color="white">
          {bio2}
        </Heading>
      </VStack>
    </VStack>
  </FullScreenSection>
);

export default LandingSection;