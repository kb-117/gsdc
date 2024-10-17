import { Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const LoadingEditPage = () => {
  return (
    <div>
      <div className="max-w-xl">
        <Skeleton height="2rem" className="mt-5" />
        <form>
          <Skeleton count={5} height="1.3rem" />
          <Flex>
            <Skeleton count={3} height="1.3rem" />
          </Flex>
        </form>
      </div>
      ;
    </div>
  );
};

export default LoadingEditPage;
