import React from "react";
import NextLink from "next/link";
import {
  Link,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  Button,
  Box
} from "@chakra-ui/core";

type LoggedInUserPicMenuProps = {
  user: {
    picture: string;
    username: string;
    name: string;
  };
};

const LoggedInUserPicMenu: React.FC<LoggedInUserPicMenuProps> = ({ user }) => {
  return (
    <Menu>
      <MenuButton>
        <Image
          src={user.picture}
          alt={user.name}
          height="35px"
          rounded="full"
          ignoreFallback
        />
      </MenuButton>
      <MenuList>
        <MenuItem>
          <NextLink href="/[username]" as={`/${user.username}`}>
            <Link>@{user.username}</Link>
          </NextLink>
        </MenuItem>
        <MenuItem>
          <NextLink href="/[username]/edit" as={`/${user.username}/edit`}>
            <Link>Edit Profile</Link>
          </NextLink>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LoggedInUserPicMenu;
