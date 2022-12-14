import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getAuthorPostsRequest } from "../../requests/requests";
import { Post } from "../../components/Post";
import { DropdownAuthors } from "../../components/DropdownAuthors";
import { Navbar } from "../../components/Navbar";
import { PostsList } from "../../components/PostsList";
import { DropdownPosts } from "../../components/DropdownPosts";
import { Footer } from "../../components/Footer";

export default function AuthorPosts() {
  const router = useRouter();
  const [ready, setReady] = React.useState(false);

  const { isLoading, isError, isSuccess, data, error } = useQuery(
    ["AuthorPosts", router.query.author],
    getAuthorPostsRequest,
    {
      enabled: ready,
    }
  );

  React.useEffect(() => {
    if (router.isReady) {
      setReady(true);
    }
  }, [router.isReady]);

  return (
    <div className="grid grid-cols-12 ml-16 divide-x-2 mr-4">
      <Navbar></Navbar>
      <div className="flex flex-col-reverse divide-y-2 divide-y-reverse col-start-1 col-span-9 border-b-2">
        {isSuccess &&
          data.data.map((val, i) => (
            <Post
              key={i}
              text={val.text}
              author={val.author}
              date={val.date}
              title={val.title}
              _id={val._id}
            ></Post>
          ))}
      </div>
      <div>
        <Footer></Footer>
        <DropdownAuthors></DropdownAuthors>
      </div>
    </div>
  );
}
