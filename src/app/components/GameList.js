import Link from "next/link";

export default function GameList({ news }) {
  return (
    <ul className="game-list">
      {news.map((item) => (
        <li key={item.id}>
          <Link href={`/game/${item.slug}`}>
            <img src={`/images/games/${item.image}`} alt={item.title} />
            <span>{item.title}</span>
            <span>฿{item.price}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
