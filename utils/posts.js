import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
// import { unified } from "unified";
// import remarkParse from "remark-parse";
// import remarkRehype from "remark-rehype";
// import rehypeSanitize from "rehype-sanitize";
// import rehypeStringify from "rehype-stringify";

const blogPostsDirectory = path.join(process.cwd(), "blog-posts");

export function getSortedBlogPostsData() {
    // Get all the filenames inside the /blog-posts folder
    const filenames = fs.readdirSync(blogPostsDirectory);

    // Get blog data from each file
    const allBlogsData = filenames.map((filename) => {
        // Remove .md from the filename to get the string we'll use as an id
        const id = filename.replace(/\.md$/, "");

        // Read markdown file as string
        const fullPath = path.join(blogPostsDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        // Use gray=matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // Combine the data with the id
        const blogData = {
            id,
            ...matterResult.data,
        };

        return blogData;
    });

    // Sort the posts by date
    return allBlogsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getAllBlogIds() {
    const filenames = fs.readdirSync(blogPostsDirectory);

    // Returns an array that looks like this:
    // [
    //  {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]

    return filenames.map((filename) => {
        return {
            params: {
                id: filename.replace(/\.md$/, ""),
            },
        };
    });
}

export async function getBlogDataById(id) {
    const fullPath = path.join(blogPostsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    // console.log(matterResult);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html).process(matterResult.content);
    const contentHtml = processedContent.toString();

    // // Use unified, remark & rehype to convert markdown into HTML string
    // const processedContent = await unified()
    //     .use(remarkParse)
    //     .use(remarkRehype)
    //     .use(rehypeSanitize)
    //     .use(rehypeStringify)
    //     .process(matterResult.content);
    // const contentHtml = String(processedContent);
    // console.log(contentHtml);

    // Combine the data with the id
    const blogData = {
        id,
        contentHtml,
        ...matterResult.data,
    };

    return blogData;
}
