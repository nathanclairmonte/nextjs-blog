import Layout from "../../components/layout";
import { getAllBlogIds, getBlogDataById } from "../../utils/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export async function getStaticProps({ params }) {
    const blogData = await getBlogDataById(params.id);

    return {
        props: {
            blogData,
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllBlogIds();

    return {
        paths,
        fallback: false,
    };
}

export default function Post({ blogData }) {
    return (
        <Layout>
            <Head>
                <title>{blogData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingX1}>{blogData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={blogData.date} type="long" />
                </div>
                <div dangerouslySetInnerHTML={{ __html: blogData.contentHtml }} />
            </article>
        </Layout>
    );
}
