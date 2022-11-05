import {Icon, ListItem, ListItemButton, ListItemButtonProps, ListItemIcon} from "@mui/material";
import Link from "next/link";
import {NavLink} from "src/@core/layouts/types";
import {ElementType} from "react";
import {styled} from "@mui/material/styles";
import Box, {BoxProps} from "@mui/material/Box";
import { handleURLQueries } from "src/@core/layouts/utils";
import {useRouter} from "next/router";
import {Template} from "src/@core/context/types";
import Typography from "@mui/material/Typography";

const MenuNavLink = styled(ListItemButton)<
  ListItemButtonProps & { component?: ElementType; target?: '_blank' | undefined }
  >(({ theme }) => ({
  width: '100%',
  borderRadius: 4,
  color: theme.palette.text.secondary,
  padding: '0 14px',
  transition: 'padding-left .25s ease-in-out, background-color .25s ease-in-out, color .25s ease-in-out',
  '&.active, &:hover': {
    color: theme.palette.customColors.main,
    backgroundColor: theme.palette.action.active,
  },
  '&.active': {
    '& .MuiTypography-root, & .MuiListItemIcon-root': {
      color: `${theme.palette.common.white} !important`
    }
  }
}))

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  overflow: 'hidden',
  fontSize: 14,
  height: 45,
})

type Props = {
  item: NavLink
  template: Template
  navHover: boolean
}

const NavMenuLink = (props: Props) => {
  const {item, template, navHover} = props;
  const router = useRouter()
  const {navCollapsed} = template

  const isNavLinkActive = () => {
    return router.pathname === item.path || handleURLQueries(router, item.path);
  }
  return (
    <ListItem>
      <Link passHref href={item.path === undefined ? '/' : `${item.path}`}>
        <MenuNavLink
          component="a"
          className={isNavLinkActive() ? 'active' : ''}
          sx={{
            pointerEvents: item.disabled ? 'none' : 'pointer',
          }}
        >
          <ListItemIcon
            sx={{
              color: 'text.primary',
              transition: 'margin .25s ease-in-out',
              mr: navCollapsed && !navHover ? 0 : 2.5,
            }}
          >
            <Icon>{item.icon}</Icon>
          </ListItemIcon>
          <MenuItemTextMetaWrapper
            sx={{
              opacity: navCollapsed && !navHover ? 0 : 1,
            }}
          >
            <Typography
              noWrap={navCollapsed && !navHover}
            >
              {item.title}
            </Typography>
          </MenuItemTextMetaWrapper>
        </MenuNavLink>
      </Link>
    </ListItem>
  )
}

export default NavMenuLink
