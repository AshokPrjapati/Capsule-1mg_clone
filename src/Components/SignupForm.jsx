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
} from "@chakra-ui/react";
import react from "react";

function SignupForm() {
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
      <FormControl>
        <InputGroup marginBottom={{ base: 10, md: 20 }}>
          <InputLeftAddon
            children={"+91"}
            borderRadius={0}
            bg="#fff"
            border={0}
          />
          <Input
            type={"number"}
            borderRadius={0}
            placeholder="Enter Your Number"
            variant="flushed"
            focusBorderColor="#ff6f61"
            isRequired
          />
        </InputGroup>
      </FormControl>

      <Button bg={"#ff6f61"}>Continue</Button>
      <Text align={"center"} color="grey">
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
