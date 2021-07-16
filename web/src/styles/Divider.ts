import { createStyles, makeStyles } from "@material-ui/core/styles"

/**
 * Styles affecting the Simple Listings Filter Button
 * This is when there are no selected filters inside it
 */
export const useFilterDivider = makeStyles(() =>
  createStyles({
    root: {
      opacity: 0.5,
    },
  })
)
