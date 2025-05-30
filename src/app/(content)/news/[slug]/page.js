import { notFound } from "next/navigation";
import Link from "next/link";
import { getNewsItem } from "@/lib/news";
export default async function NewsContentPage({ params }) {
  const { slug } = await params;
  /*
   หาข่าวที่ตรงกับ slug ที่ระบุ
   */
  const newsItem = await getNewsItem(slug); //DUMMY_NEWS.find(item => item.slug == slug);

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
          <Link href={`/news/${slug}/image`}>
            <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
          </Link>
          <h1>{newsItem.title}</h1>
          <time dateTime={newsItem.dateTime}>{newsItem.dateTime}</time>
        </header>
        <p>฿{newsItem.price}</p>
      </article>
    </>
  );
}
