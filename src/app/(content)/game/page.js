//ใช้สำหรับ ฝั่ง Server-side ลบ "use client" และ use
import GameList from "../../components/GameList";
import { getAllNews } from "@/lib/news";

export default async function GamePage() {
  //const response = await fetch('http://localhost:8080/news');
  const game = await getAllNews(); //await response.json();
  return (
    <>
      <GameList news={game} />
    </>
  );
}
