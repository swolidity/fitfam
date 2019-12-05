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
    <Stat>
      <StatLabel>Weight</StatLabel>
      <StatNumber>{user.bodyweights[0].weight} lbs</StatNumber>
      <StatHelpText>
        {formatDistanceToNow(new Date(user.bodyweights[0].createdAt))} ago
      </StatHelpText>
    </Stat>
  );
};

export default BodyweightStat;
