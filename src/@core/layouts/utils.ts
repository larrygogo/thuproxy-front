// ** Types
import { NavLink } from 'src/@core/layouts/types'
import { NextRouter } from 'next/router'

/**
 * Check for URL queries as well for matching
 * Current URL & Item Path
 *
 * @param item
 * @param activeItem
 */
export const handleURLQueries = (router: NextRouter, path: string | undefined): boolean => {
  if (Object.keys(router.query).length && path) {
    const arr = Object.keys(router.query)

    return router.asPath.includes(path) && router.asPath.includes(router.query[arr[0]] as string) && path !== '/'
  }

  return false
}

/**
 * Check if this is a children
 * of the given item
 *
 * @param children
 * @param openGroup
 * @param currentActiveGroup
 */
export const removeChildren = (children: NavLink[], openGroup: string[], currentActiveGroup: string[]) => {
  children.forEach((child: NavLink) => {
    if (!currentActiveGroup.includes(child.title)) {
      const index = openGroup.indexOf(child.title)
      if (index > -1) openGroup.splice(index, 1)

      // @ts-ignore
      if (child.children) removeChildren(child.children, openGroup, currentActiveGroup)
    }
  })
}
