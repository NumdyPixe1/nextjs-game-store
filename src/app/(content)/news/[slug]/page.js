import { notFound } from "next/navigation";
import Link from "next/link";
import { getNewsItem } from "@/lib/news";
export default async function NewsContentPage({ params }) {
  const { slug } = await params;
  /*
   หาข่าวที่ตรงกับ slug ที่ระบุ
   */
  const gameItem = await getNewsItem(slug); //DUMMY_NEWS.find(item => item.slug == slug);

  if (!gameItem) {
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
          <Link href={`/news/${slug}/image`}>
            <img src={`/images/news/${gameItem.image}`} alt={gameItem.title} />
          </Link>
          <h1>{gameItem.title}</h1>
          <time dateTime={gameItem.dateTime}>{gameItem.dateTime}</time>
        </header>
        <p>฿{gameItem.price}</p>
        {/* <iframe src={gameItem.video}></iframe> */}
        <span>{gameItem.content}</span>
      </article>
    </>
  );
}
