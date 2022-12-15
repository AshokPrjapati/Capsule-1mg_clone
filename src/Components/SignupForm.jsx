import {
  Link,
  Text,
  Stack,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  FormControl,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useState } from "react";

import Form from "./Form";

function SignupForm() {
  const [mobileNumber, setMobileNumber] = useState("");

  const handleNumber = (number) => {
    setMobileNumber(number);
  };

  return (
    <Stack
      textAlign={"left"}
      padding="50px"
      maxW={{ base: "100%", md: "40%" }}
      minW="30%"
      // shadow={{ base: "md", md: "xs" }}
    >
      <Heading fontSize="30px">Sign Up</Heading>
      <Text color={"grey"} fontSize="14px" paddingBottom={{ base: 10, md: 20 }}>
        Please enter your mobile number to receive one time password (OTP)
      </Text>

      <Form handleNumber={handleNumber} mobileNumber={mobileNumber} />

      <Text align={"center"} color="grey" pt={3}>
        Have an account ?{" "}
        <Link color={"#ff6f61"} fontWeight="700">
          Login
        </Link>
      </Text>
      <Text align={"center"} color="grey" fontSize={"12px"}>
        By signing up, you agree to our Terms and Conditions & Privacy Policy
      </Text>
    </Stack>
  );
}

export default SignupForm;
