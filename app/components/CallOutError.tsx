import { Callout } from "@radix-ui/themes";
import { PropsWithChildren } from "react";
import { BiInfoCircle } from "react-icons/bi";

const CallOutError = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Callout.Root className="mb-5">
      <Callout.Icon>
        <BiInfoCircle />
      </Callout.Icon>
      <Callout.Text>{children}</Callout.Text>
    </Callout.Root>
  );
};

export default CallOutError;
