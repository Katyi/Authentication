import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useLocation, useNavigate} from "react-router-dom";

interface updateFormData {
  title: string;
  description: string;
}

export const UpdateForm = () => {
  const location = useLocation();
  const { post } = location.state;
  const navigate = useNavigate();
  const schema = yup.object().shape({
    title: yup.string().required("You must add a title."),
    description: yup.string().required("You must add a description."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateFormData>({
    resolver: yupResolver(schema),
  });

  const onUpdatePost = async (data: updateFormData) => {
    await updateDoc(doc(db, "posts", post.id), {
      ...data,
    });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onUpdatePost)}>
      <input placeholder={`${post.title}`} {...register("title")} />
      <p style={{ color: "red" }}>{errors.title?.message}</p>
      <textarea placeholder={`${post.description}`} {...register("description")} />
      <p style={{ color: "red" }}>{errors.description?.message}</p>
      <input value={"Submit"} type="submit" className="submitForm"/>
      <button className="createUpdFormBtn" onClick={()=> navigate("/")} > Cancel </button>
    </form>
  );
};