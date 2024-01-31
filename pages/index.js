import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });




// ... (other imports)

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `
          query getPosts {
            posts {
              nodes {
                title
                content
              }
            }
          }
        `;

        const url = process.env.NEXT_PUBLIC_API_URL;

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        });

        if (!res.ok) {
          console.error(`Error fetching data. Status: ${res.status}`);
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        if (data) {
          setPosts(data.data.posts.nodes);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setPosts([]);
      }
    };

    fetchData();
  }, []); 

  return (
    <>
      {/* ... (Head component) */}
      <main className={`${styles.main} ${inter.className}`}>
        {posts.map((post) => (
          <div key={post.title}>
            <h2>{post.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        ))}
      </main>
    </>
  );
}

