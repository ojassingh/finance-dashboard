
import {
    ChevronDownIcon,
    CircleIcon,
    PlusIcon,
    StarIcon,
  } from "@radix-ui/react-icons"
  
  import { Button } from "./ui/button"

  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "./ui/card"

  import {motion} from "framer-motion";
  import { format, parseISO } from 'date-fns';

  
  export function Article(article: any, key: any) {

    function formatDateString(dateString: any) {
        const date = parseISO(dateString);
        const formattedDate = format(date, 'dd MMMM yyyy');
      
        return formattedDate;
    }      

    const articleData = article.article;
    // console.log(articleData)

    var description:string = articleData.description;
    var title:string = articleData.title;

    if (description.length > 100){
        description = description.substring(0, 100) + "... read more"
    }


    const date = articleData.publishedAt
    const formattedDate = formatDateString(date)


    
    return (
      <motion.div key={key} whileHover={{scale: 0.98,
        transition: { type: "spring", duration: 0.8 }}} className="z-0" >
        <Card className="w-80">
        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
          <div className="space-y-1">
            <a href={articleData.url} target="_blank">
              <CardTitle className="hover:underline">
                  {title}
              </CardTitle>
            </a>
            <CardDescription>
              {description}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
            <Button variant="secondary" className="px-3 shadow-none z-10">
              <StarIcon className="mr-2 h-4 w-4 z-20" />
              Star
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
              {articleData.author}
            </div>
            <div>{formattedDate}</div>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    )
  }