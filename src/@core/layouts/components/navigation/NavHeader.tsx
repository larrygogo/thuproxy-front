import {styled} from "@mui/material/styles";
import Box, {BoxProps} from "@mui/material/Box";
import Link from "next/link";
import {Template} from "src/@core/context/types";

const NavHeaderWrapper = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}))

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  minHeight: '64px',
  width: '100%',
})

type Props = {
  hidden?: boolean
  navHover?: boolean
  template: Template
  saveTemplate: (values: Template) => void
}

const NavHeader = (props: Props) => {
  const {template, navHover} = props;

  const {logo, minLogo, navCollapsed} = template;

  const largeLogo = logo || minLogo;

  const logoSrc = navCollapsed && !navHover ? minLogo : largeLogo;

  return <NavHeaderWrapper>
    <Link href="/" passHref>
      <StyledLink
        sx={{
          pl: navCollapsed && !navHover ? 2 : 4,
          pr: navCollapsed && !navHover ? 2 : 4,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="logo" width="100" height="32"/>
      </StyledLink>
    </Link>
  </NavHeaderWrapper>
}

export default NavHeader
