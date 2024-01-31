import React, { useState, useEffect } from 'react';

const AboutNature = () => {
  const [myData, setMyData] = useState([]);
  const url = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `
          query NewQueryCopy {
            posts(where: { title: "getNatureDetails" }) {
              nodes {
                content
                postId
                title
              }
            }
          }
        `;

        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });

        if (!res.ok) {
          console.error(`Error fetching data. Status: ${res.status}`);
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        if (data) {
          console.log(data.data.posts.nodes);
          setMyData(data.data.posts.nodes);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setMyData([]);
      }
    };

    fetchData();
  }, [url]);

  const parseContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const imageSrc = doc.querySelector('img').getAttribute('src');
    const paragraphs = Array.from(doc.querySelectorAll('p')).map((p) => p.innerHTML);

    return { imageSrc, paragraphs };
  };

  return (
    <div className="container text-center">
      {myData.map((item) => (
        <div key={item.id}>
          {item.content && (
            <>
              {parseContent(item.content).imageSrc && (
                <img
                  src={parseContent(item.content).imageSrc}
                  alt="Nature"
                  key={item.id}
                />
              )}
              {parseContent(item.content).paragraphs.map((paragraph, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default AboutNature;
