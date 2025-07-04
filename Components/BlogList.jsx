import { blog_data } from "@/Assets/assets";
import BlogItem from "./BlogItem";
import { useState } from "react";

const BlogList = () => {
  const [menu, setMenu] = useState('All');
  return (
    <div className="text-black">
      <div className="flex justify-center gap-6 my-10">
        <button onClick={() => setMenu('All')} className={menu === 'All' ? "bg-black py-1 px-4 text-gray-200 rounded-sm" : ""}>All</button>
        <button onClick={() => setMenu('Technology')} className={menu === 'Technology' ? "bg-black py-1 px-4 text-gray-200 rounded-sm" : ""}>Technology</button>
        <button onClick={() => setMenu('Startup')} className={menu === 'Startup' ? "bg-black py-1 px-4 text-gray-200 rounded-sm" : ""}>Startup</button>
        <button onClick={() => setMenu('Lifestyle')} className={menu === 'Lifestyle' ? "bg-black py-1 px-4 text-gray-200 rounded-sm" : ""}>Lifestyle</button>
      </div>
      <div className="flex  flex-wrap justify-around gap-1 gap-y-10 mb-16 ">{blog_data.filter((item) => menu === "All" ? true : item.category === menu).map((item, index) => {
        return <BlogItem key={index} id={item.id} image={item.image} title={item.title} category={item.category} description={item.description}></BlogItem>
      })}</div>

    </div>
  );
};

export default BlogList;