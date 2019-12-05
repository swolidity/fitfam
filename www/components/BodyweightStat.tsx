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

const BodyweightStat = ({ user }) => {
  return (
    <NextLink href="/[username]/bodyweight" as={`/${user.username}/bodyweight`}>
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
  );
};

export default BodyweightStat;
