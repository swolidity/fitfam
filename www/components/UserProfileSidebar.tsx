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
              <Text fontWeight="bold" fontSize="lg">
                @{user.username}
              </Text>
            </Box>
          </Link>
        </NextLink>
      </Flex>

      <Text mb={3}>{user.bio}</Text>

      <NextLink
        href="/[username]/bodyweight"
        as={`/${user.username}/bodyweight`}
      >
        <Link>
          <Stat border="1px solid #ccc" borderRadius="5px" p={2}>
            <StatLabel>Weight</StatLabel>
            <StatNumber>{user.bodyweights[0].weight} lbs</StatNumber>
            <StatHelpText>
              {formatDistanceToNow(new Date(user.bodyweights[0].createdAt))} ago
            </StatHelpText>
          </Stat>
        </Link>
      </NextLink>
    </>
  );
};

export default UserProfileSidebar;
