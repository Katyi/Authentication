import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from 'firebase/firestore';
import { useEffect, useState, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth, db } from '../../config/firebase';
import { Post as IPost } from './main';
import { MainContext } from "./main";

interface Props { 
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { getPosts } = useContext(MainContext);
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);
  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc)=> ({ userId: doc.data().userId, likeId: doc.id})));
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes((prev) => prev && prev.filter((like)=>like.likeId !== likeId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid)

  const removePost = async () => {
    removeLike();
    await deleteDoc(doc(db, 'posts', post.id));
    getPosts();
  };

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div className='title'>
        <h1>{post.title}</h1>
      </div>
      <div className='body'>
        <p>{post.description}</p>
      </div>
      <div className='footer'>
        <p>@{post.username}</p>
        <div className='postButtons'>
          <div>
            <button onClick={hasUserLiked ? removeLike : addLike}>
              {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
            </button>
            {likes && <p> Likes: {likes?.length} </p>}
          </div>
          <button>
            <Link className='updDelBtn' to='/updatepost' state={{ post: props.post }}> Update Post </Link>
          </button>
          <button className='updDelBtn' onClick={removePost}> Delete Post </button>
        </div>
      </div>
    </div>
  );
};