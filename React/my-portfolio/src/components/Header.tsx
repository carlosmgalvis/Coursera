import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faGithub,
  faLinkedin,
  faMedium,
  faStackOverflow,
} from "@fortawesome/free-brands-svg-icons";
import { Box, HStack } from "@chakra-ui/react";

const socials = [
  {
    icon: faEnvelope,
    url: "mailto:mail@gmail.com",
  },
  {
    icon: faGithub,
    url: "https://github.com/carlosmgalvis",
  },
  {
    icon: faLinkedin,
    url: "https://www.linkedin.com/in/carlosmgalvist/",
  },
  {
    icon: faMedium,
    url: "https://medium.com",
  },
  {
    icon: faStackOverflow,
    url: "https://stackoverflow.com",
  },
];

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const prevScrollY = useRef<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const headerElement = headerRef.current;

      if (!headerElement) return;

      // Scrolling down and past a small threshold (e.g. 200px)
      if (currentScrollY > prevScrollY.current && currentScrollY > 200) {
        headerElement.style.transform = "translateY(-200px)";
      } else {
        // Scrolling up
        headerElement.style.transform = "translateY(0)";
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (anchor: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const id = `${anchor}-section`;
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <Box
      ref={headerRef}
      position="fixed"
      top={0}
      left={0}
      right={0}
      transitionProperty="transform"
      transitionDuration=".3s"
      transitionTimingFunction="ease-in-out"
      backgroundColor="#18181b"
      zIndex={1000}
    >
      <Box color="white" maxWidth="1280px" margin="0 auto">
        <HStack
          px={16}
          py={4}
          justifyContent="space-between"
          alignItems="center"
        >
          <nav>
            <HStack gap={8}>
              {socials.map(({ icon, url }) => (
                <a
                  key={url}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block' }}
                >
                  <FontAwesomeIcon icon={icon} size="2x" />
                </a>
              ))}
            </HStack>
          </nav>
          <nav>
            <HStack gap={8}>
              <a 
                href="#projects" 
                onClick={handleClick("projects")}
                style={{ cursor: 'pointer' }}
              >
                Projects
              </a>
              <a 
                href="#contact-me" 
                onClick={handleClick("contactme")}
                style={{ cursor: 'pointer' }}
              >
                Contact Me
              </a>
            </HStack>
          </nav>
        </HStack>
      </Box>
    </Box>
  );
};

export default Header;