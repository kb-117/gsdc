import { Heading, Flex } from "@radix-ui/themes";
import React from "react";
import { Skeleton } from "@/app/components";

const LoadingDetailPage = () => {
  return (
    <div className="max-w-xl">
      <Heading>
        <Skeleton />
      </Heading>
      <Skeleton />
      <Skeleton />

      <Flex gap="5">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Flex>
      <Skeleton />
    </div>
  );
};

export default LoadingDetailPage;
