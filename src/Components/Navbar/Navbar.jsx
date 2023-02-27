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
  Avatar,
} from "@chakra-ui/react";

import { FaShoppingCart } from "react-icons/fa";
import { Link as RouterLink, NavLink } from "react-router-dom";

import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { AuthContext } from "../../Contexts/AuthContext";
import { useContext } from "react";
import UserCard from "../Auth/UserCard";
import { CartContext } from "../../Contexts/CartContext";
import NAV_ITEMS from "../../Constants/NavLinks";

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
  const { cartCount } = useContext(CartContext);
  const { isReg } = useContext(AuthContext);
  const { isOpen, onToggle } = useDisclosure();

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
            <NavLink to="/">Capsule</NavLink>
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
            <NavLink to="/login">
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                borderRight={"1px solid"}
                borderRadius="none"
                pr={"10px"}
              >
                Login
              </Button>
            </NavLink>

            <NavLink to="/signup">
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
              >
                Sign Up
              </Button>
            </NavLink>
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
          <RouterLink to="/cart">
            <FaShoppingCart
              color={cartCount ? "#ff6f61" : "#000"}
              fontSize={"20px"}
              cursor="pointer"
            />
          </RouterLink>
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
  const linkHoverColor = useColorModeValue("#ff6f61", "white");
  // const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4} align={"center"}>
      {NAV_ITEMS.map((navItem, i) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <NavLink to={navItem.href}>
                <Text
                  p={2}
                  fontSize={"md"}
                  fontWeight={700}
                  fontFamily="Clear Sans"
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Text>
              </NavLink>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  const { isReg, userData, handleIsReg, handleUser } = useContext(AuthContext);
  return (
    <Stack p={4} display={{ md: "none" }} bg="#fff">
      {isReg ? (
        <Flex
          rounded={"full"}
          variant={"link"}
          cursor={"pointer"}
          minW={0}
          justify="space-between"
          align={"center"}
        >
          <Flex
            align={"center"}
            gap="5px"
            as={Button}
            bg={"none"}
            _hover={{ bg: "none" }}
          >
            <Avatar
              size={"sm"}
              src={"https://avatars.dicebear.com/api/male/username.svg"}
            />
            <Text
              textDecor={"none"}
              fontWeight={600}
              fontSize="18px"
              color={"#000"}
            >
              {userData.fName}
            </Text>
          </Flex>
          <Button
            size={"sm"}
            onClick={() => {
              handleIsReg(false);
              handleUser({});
            }}
          >
            LogOut
          </Button>
        </Flex>
      ) : (
        AUTH_ITEMS.map((navItem) => (
          <MobileNavItem key={navItem.label} {...navItem} />
        ))
      )}

      <Divider />
      {NAV_ITEMS.map((navItem) => (
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
