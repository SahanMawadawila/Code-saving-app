"use server";

import db from "@/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function submitEditedCode(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: {
      code,
    },
  });

  revalidatePath(`/snippets/${id}`);

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  revalidatePath("/");

  redirect("/");
}
export const createSnippet = async (
  formState: { message: string },
  formData: FormData
) => {
  const title = formData.get("title"); //name of the input field is used to get the value
  const code = formData.get("code");

  if (!title || !code) {
    return {
      message: "Please fill in all fields",
    };
  }
  if (typeof title !== "string" || typeof code !== "string") {
    return {
      message: "Invalid data",
    };
  }

  if (title.length > 100) {
    return {
      message: "Title is too long",
    };
  }

  try {
    // throw new Error("Failed to create snippet");
    const obj = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        message: e.message,
      };
    } else {
      return {
        message: "Something went wrong",
      };
    }
  }

  revalidatePath("/");
  redirect("/");
};
