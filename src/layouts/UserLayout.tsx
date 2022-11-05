import {ReactNode} from "react";
import {useTemplate} from "../@core/hooks/useTemplate";
import Layout from "src/@core/layouts/Layout";
import menus from "src/configs/menus";

interface Props {
  children: ReactNode
}

const UserLayout = ({ children }: Props) => {
  const {template, saveTemplate} = useTemplate()

  return (
    <Layout
      template={template}
      saveTemplate={saveTemplate}
      navMenu={menus()}
    >
      {children}
    </Layout>
  )
}

export default UserLayout
