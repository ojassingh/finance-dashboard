
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
  
  export function Article(article: any, key: any) {

    const articleData = article.article;
    // console.log(articleData)

    var description:string = articleData.description;
    var title:string = articleData.title;

    if (description.length > 100){
        description = description.substring(0, 100) + "... read more"
    }


    const date = new Date(articleData.publishedDate);
    const options: any = { year: 'numeric', month: 'long' };
    const formattedDate = date.toLocaleDateString('en-US', options);


    
    return (
      <motion.a key={key} whileHover={{scale: 0.98,
        transition: { type: "spring", duration: 0.8 }}} className="z-0" href={articleData.url} target="_blank">
        <Card className="w-80">
        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
          <div className="space-y-1">
            <CardTitle>
                {title}
            </CardTitle>
            <CardDescription>
              {description}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
            <Button variant="secondary" className="px-3 shadow-none z-10">
              <StarIcon className="mr-2 h-4 w-4" />
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
      </motion.a>
    )
  }