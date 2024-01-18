import { useState } from "react"
import RichHill from './Articles/RichHill.mdx'
import ArticleOne from "./ArticleOne"
import ArticleTwo from "./ArticleTwo"

export default function BlogHome(){

  

  return (
    <div className="WrapperBlogHome">
      <RichHill />
      
      {/* <ArticleOne /> */}
    </div>
  )
}