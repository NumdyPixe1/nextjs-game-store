import { notFound } from "next/navigation";
import Link from "next/link";
import { getNewsItem, getAllNews } from "@/lib/game";
import GameList from "@/app/components/GameList";

export default async function GameContentPage({ params }) {
  const { slug } = await params;
  /*
   หาข่าวที่ตรงกับ slug ที่ระบุ
   */
  const gameItem = await getNewsItem(slug);
  const allGameItem = await getAllNews();

  if (!gameItem) {
    /*
    เรียก NewsNotFoundPage ใน not-found.js 
    แต่ถ้าไม่มี not-found.js ของ news ก็จะไปเรียกของ global
    */
    notFound();
  }
  //แปลงค่า video
  let url_spl = gameItem.video
    .split("https://www.youtube.com/watch?v=")
    .join("");
  gameItem.video = url_spl;

  return (
    <>
      <article style={{ marginBottom: "5rem" }} className="news-article">
        <header>
          <Link href={`/game/${slug}/image`}>
            <img src={`/images/games/${gameItem.image}`} alt={gameItem.title} />
          </Link>
          <h3>{gameItem.title}</h3>
          <time dateTime={gameItem.dateTime}>{gameItem.dateTime}</time>
        </header>
        <h1>฿{gameItem.price}</h1>
        <iframe
          width="420"
          height="315"
          src={`https://www.youtube.com/embed/${gameItem.video}`}
        ></iframe>
        <p>{gameItem.content}</p>
      </article>
      <GameList game={allGameItem} />
    </>
  );
}
