import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

// Define the props for the Layout component, including children
interface LayoutProps {
  children: ReactNode;
  maxWidth?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, maxWidth = "100%" }) => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, blue.800, blue.600, blue.400)" // Background for the layout
    >
      <Box
        w="95%" // Make the container take up 95% of the screen width
        maxW={maxWidth} // Default to 100% width unless overridden by children
        mx="auto" // Center the box
        p={4} // Keep some padding
      >
        {children}
        {/* Children components like RegisterUser can set their own backgrounds */}
      </Box>
    </Box>
  );
};

export default Layout;
