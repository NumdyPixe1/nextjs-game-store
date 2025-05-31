import NewsList from "@/app/components/GameList";
//ข่าวล่าสุด
import { getLatestNews } from "@/lib/news";

//เพิ่ม async และ await ตาม lib -> news.js -> async getLatestNews()
export default async function LatestNewsPage() {
  const latesNews = await getLatestNews();

  return (
    <>
      <h2>Latest News</h2>
      <NewsList news={latesNews} />
    </>
  );
}
