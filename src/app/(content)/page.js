//ใช้สำหรับ ฝั่ง Server-side ลบ "use client" และ use
import NewsList from "@/app/components/NewsList";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
  //const response = await fetch('http://localhost:8080/news');
  const news = await getAllNews(); //await response.json();
  return (
    <>
      <NewsList news={news} />
    </>
  );
}
