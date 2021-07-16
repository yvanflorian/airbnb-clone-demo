import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

/**
 * Styles affecting the Simple Listings Filter Button
 * This is when there are no selected filters inside it
 */
export const useSimpleFilterButton = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: "30px !important",
      border: "1px solid rgba(0, 0, 0, 0.23)",
      padding: "5px 15px",
      "&:hover": {
        borderColor: "#222222 !important",
      },
    },
  })
)
