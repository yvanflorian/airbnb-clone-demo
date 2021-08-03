import { Helmet } from "react-helmet"

interface MyHelmetProps {
   title: string,
   description: string
}

export const MyHelmet = (props: MyHelmetProps): JSX.Element => {
   return (
      <Helmet>
         <html lang="en" />
         <title>{props.title}</title>
         <meta name="description" content={props.description} />
      </Helmet>
   )
}