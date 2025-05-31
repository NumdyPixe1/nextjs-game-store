import { notFound } from "next/navigation";
import Link from "next/link";
import { getNewsItem } from "@/lib/news";
export default async function NewsContentPage({ params }) {
  const { slug } = await params;
  /*
   หาข่าวที่ตรงกับ slug ที่ระบุ
   */
  const newsItem = await getNewsItem(slug);
  let url_spl = newsItem.video
    .split("https://www.youtube.com/watch?v=")
    .join("");

  newsItem.video = url_spl;
  if (!newsItem) {
    /*
    เรียก NewsNotFoundPage ใน not-found.js 
    แต่ถ้าไม่มี not-found.js ของ news ก็จะไปเรียกของ global
    */
    notFound();
  }
  return (
    <>
      <article className="news-article">
        <header>
          <Link href={`/game/${slug}/image`}>
            <img src={`/images/games/${newsItem.image}`} alt={newsItem.title} />
          </Link>
          <h3>{newsItem.title}</h3>
          <time dateTime={newsItem.dateTime}>{newsItem.dateTime}</time>
        </header>
        <h1>฿{newsItem.price}</h1>
        <iframe
          width="420"
          height="315"
          src={`https://www.youtube.com/embed/${newsItem.video}`}
        ></iframe>
        <p>{newsItem.content}</p>
      </article>
    </>
  );
}
