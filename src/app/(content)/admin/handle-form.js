/*
 Server action
 ป้องกันการโดนเปลี่ยน
*/
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function opreateGame(formData) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const id = formData.get("id");

  const res = await fetch(
    id ? `${baseUrl}/api/game/${id}` : `${baseUrl}/api/game`,
    {
      method: id ? "PUT" : "POST",
      body: formData,
    }
  );

  if (res.ok) {
    revalidatePath("/", "layout");
    //เสร็จสิ้นแล้วจะกลับไปหน้าแรก
    redirect("/game");
  } else {
    const err = await res.json();
    throw new Error(err.message || "News operation failed");
  }
}
