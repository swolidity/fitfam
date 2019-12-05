import {
  Flex,
  Box,
  Image,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Link
} from "@chakra-ui/core";
import { formatDistanceToNow } from "date-fns";
import NextLink from "next/link";

const UserProfileSidebar = ({ user }) => {
  return (
    <>
      <Flex align="center" mb={3}>
        <NextLink href="/[username]" as={`/${user.username}`}>
          <Link>
            <Image
              src={user.picture}
              alt={user.name}
              height="80px"
              rounded="full"
              mr={4}
              ignoreFallback
            />
          </Link>
        </NextLink>

        <NextLink href="/[username]" as={`/${user.username}`}>
          <Link>
            <Box>
              <Text fontWeight="bold" fontSize="2xl">
                {user.name}
              </Text>
              <Text fontSize="lg" color="#666">
                @{user.username}
              </Text>
            </Box>
          </Link>
        </NextLink>
      </Flex>

      <Text mb={3}>{user.bio}</Text>
    </>
  );
};

export default UserProfileSidebar;
