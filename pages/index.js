import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedBlogPostsData } from "../utils/posts";
import Date from "../components/date";

export async function getStaticProps() {
    const allBlogsData = getSortedBlogPostsData();

    return {
        props: {
            allBlogsData,
        },
    };
}

export default function Home({ allBlogsData }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>
                    Hello, I'm <b>Nathan</b>. I'm a machine learning engineer, data scientist and
                    full-stack developer. You can contact me on{" "}
                    <a href="https://twitter.com/cIairmonte">Twitter</a>
                </p>
            </section>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingMd}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allBlogsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href={`posts/${id}`}>{title}</Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} type="numeric" />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}
