import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useDisclosure,
  Heading,
  Divider,
  MenuList,
  Center,
  Avatar,
  MenuDivider,
  MenuItem,
  Menu,
  MenuButton,
} from "@chakra-ui/react";

import { FaShoppingCart } from "react-icons/fa";

import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { AuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";
import UserCard from "./UserCard";

const NAV_ITEMS = [
  {
    label: "MEDICINE",
    href: "#",
  },
  {
    label: "LEB TESTS",
    href: "#",
  },
  {
    label: "CONSULTS DOCTORS",
    href: "#",
  },
  {
    label: "COVID-19",
    href: "#",
  },
  {
    label: "AYURVEDA",
    href: "#",
  },
  {
    label: "CARE PLAN",
    href: "#",
  },
];

const AUTH_ITEMS = [
  {
    label: "Login",
    href: "/login",
  },
  {
    label: "Signup",
    href: "/signup",
  },
];

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const { isReg } = useContext(AuthContext);

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"40px"}
        py={{ base: 2 }}
        px={{ base: 2 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        justify="center"
      >
        <Flex ml={{ base: -2 }} display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Heading align={"left"} color="#000" fontSize="25px">
            <Link href="/">Capsule</Link>
          </Heading>

          <Flex
            display={{ base: "none", md: "none", lg: "flex" }}
            ml={10}
            mr={10}
          >
            <DesktopNav />
          </Flex>
        </Flex>
        {isReg ? (
          <UserCard />
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={2}
            display={{ base: "none", md: "none", lg: "flex" }}
          >
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              href={"/login"}
              borderRight={"1px solid"}
              borderRadius="none"
              pr={"10px"}
            >
              Login
            </Button>
            <Button
              as={"a"}
              fontSize={"sm"}
              fontWeight={400}
              variant={"link"}
              href={"/signup"}
            >
              Sign Up
            </Button>
          </Stack>
        )}

        <Flex justify="space-around" m={"0 20px"} gap={"20px"} align="center">
          <Text
            as="p"
            cursor={"pointer"}
            display={{ base: "none", md: "none", lg: "flex" }}
          >
            Offer
          </Text>
          <FaShoppingCart fontSize={"20px"} cursor="pointer" />
          <Text
            as="p"
            cursor="pointer"
            display={{ base: "none", md: "none", lg: "flex" }}
            fontSize={"14px"}
          >
            Need Help?
          </Text>
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "#ff6f61");
  const linkHoverColor = useColorModeValue("#ff6f61", "white");
  // const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} align={"center"}>
      {NAV_ITEMS.map((navItem, i) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"md"}
                fontWeight={700}
                fontFamily="Clear Sans"
                color={i === 0 ? "#ff6f61" : linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Divider />
      {AUTH_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
