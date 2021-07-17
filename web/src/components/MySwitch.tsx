
import Switch, { SwitchProps } from "@material-ui/core/Switch"
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles"

const useStyles = makeStyles((theme: Theme) => createStyles({
   root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
   },
   switchBase: {
      padding: 1,
      '&$checked': {
         transform: 'translateX(16px)',
         color: theme.palette.common.white,
         '& + $track': {
            backgroundColor: theme.palette.common.black,
            opacity: 1,
            border: 'none',
         },
      },
      '&$focusVisible $thumb': {
         color: '#52d869',
         border: '6px solid #fff',
      },
   },
   thumb: {
      width: 24,
      height: 24,
   },
   track: {
      borderRadius: 26 / 2,
      border: `0px solid ${theme.palette.grey[400]}`,
      backgroundColor: theme.palette.grey[400],
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
   },
   checked: {},
   focusVisible: {},
}))

export const MySwitch = (props: SwitchProps) => {
   const classes = useStyles()

   return (
      <Switch
         focusVisibleClassName={classes.focusVisible}
         disableRipple
         classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
         }}
         {...props}
      />
   )
}