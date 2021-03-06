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
    selected: {
      border: "2px solid #000000",
      borderRadius: "30px !important",
      padding: "5px 15px",
      "&:hover": {
        borderColor: "#222222 !important",
      },
    },
  })
)

export const useKnobIconButton = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      borderRadius: "50%",
      border: "1px solid rgba(0, 0, 0, 0.23)",
      padding: "3px",
      color: "#757575",
      fontSize: "1.36071428571428572rem",
      "&:hover": {
        borderColor: "#222222 !important",
      },
    },
  })
)
