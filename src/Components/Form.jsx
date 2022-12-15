import React from "react";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  FormControl,
  useDisclosure,
} from "@chakra-ui/react";

import VerifyOtp from "./VerifyOtp";
import ShowAlert from "./ShowAlert";

function Form({ handleNumber, mobileNumber }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  return (
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
          value={mobileNumber}
          onChange={(e) => handleNumber(e.target.value)}
        />
      </InputGroup>

      <ShowAlert
        isOpen={isOpenAlert}
        onClose={onCloseAlert}
        status="error"
        title="Invalid Mobile Number"
        subtitle={"Please check and try again"}
      />

      <Button
        bg={"#ff6f61"}
        onClick={() => {
          return mobileNumber.length !== 10 ? onOpenAlert() : onOpen();
        }}
        w="100%"
      >
        Continue
      </Button>
      <VerifyOtp isOpen={isOpen} onClose={onClose} />
    </FormControl>
  );
}

export default Form;
