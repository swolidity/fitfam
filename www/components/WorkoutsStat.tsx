import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Link
} from "@chakra-ui/core";
import { formatDistanceToNow } from "date-fns";
import NextLink from "next/link";

const WorkoutsStat = ({ user }) => {
  return (
    <Stat>
      <StatLabel>Workouts</StatLabel>
      <StatNumber>0</StatNumber>
      <StatHelpText>no workout data</StatHelpText>
    </Stat>
  );
};

export default WorkoutsStat;
