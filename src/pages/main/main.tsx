import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect, createContext } from 'react';
import { db } from '../../config/firebase';
import { Post } from "./post";

export interface Post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const MainContext = createContext<{getPosts: () => void}>({getPosts: () => undefined});

export const Main = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPosts = async() => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <MainContext.Provider value ={{ getPosts} }>
      {postsList?.map((post, index) => (
        <Post post={post} key={index}/>
      ))}
    </MainContext.Provider>
  );
};