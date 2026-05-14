import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

// 1. Define an interface for the component props
interface CardProps {
  title: string;
  description: string;
  imageSrc: string; // This matches the import/URL strings from your ProjectsSection
}

const Card = ({ title, description, imageSrc }: CardProps) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
return (
    <VStack
      backgroundColor="white"
      borderRadius="xl"
      overflow="hidden"
      alignItems="start"
      gap={4}
      cursor="pointer"
    >
      {/* Card Image */}
      <Image 
        src={imageSrc} 
        alt={title} 
        borderRadius="xl" 
        width="100%" 
        objectFit="cover"
      />

      {/* Card Content Container */}
      <VStack px={4} pb={4} alignItems="start" gap={3}>
        <Heading as="h3" size="md" color="black">
          {title}
        </Heading>
        
        <Text color="gray.600" fontSize="lg">
          {description}
        </Text>

        {/* Footer Link */}
        <HStack gap={2} fontWeight="bold" color="black">
          <Text fontSize="sm">See more</Text>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Card;
