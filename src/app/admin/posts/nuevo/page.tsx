import { PostForm } from "@/features/admin/post-form";

export default function NuevoPostPage() {
  return (
    <div>
      <h1 className="font-display mb-8 text-3xl font-semibold tracking-tight">
        Nueva publicación
      </h1>
      <PostForm />
    </div>
  );
}
