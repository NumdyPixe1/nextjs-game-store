//ติดตั้ง npm i
import express from "express";
import sqlite from "better-sqlite3";
import cors from "cors";

const DUMMY_NEWS = [
  {
    id: "g1",
    slug: "gta-v",
    title: "Grand Theft Auto V Enhanced PC - Rockstar Games Launcher",
    image: "gta-v",
    content:
      "Experience entertainment blockbusters Grand Theft Auto V and Grand Theft Auto Online — now upgraded for a new generation with stunning visuals, faster loading, 3D audio, and more, plus exclusive content for GTA Online players.",
    date: "2025-04-05",
    price: "386.29",
    // video: "",
  },
];
const db = sqlite("data.db");

function initDb() {
  db.prepare(
    "CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY, slug TEXT UNIQUE, title TEXT, content TEXT, price TEXT, date TEXT, image TEXT)"
  ).run();

  const { count } = db.prepare("SELECT COUNT(*) as count FROM news").get();

  if (count === 0) {
    const insert = db.prepare(
      "INSERT INTO news (slug, title, content, price,  date, image) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );

    DUMMY_NEWS.forEach((news) => {
      insert.run(
        news.slug,
        news.title,
        news.content,
        news.price,
        // news.video,
        news.date,
        news.image
      );
    });
  }
}

const app = express();

app.use(cors());

app.get("/news", (req, res) => {
  const news = db.prepare("SELECT * FROM news").all();
  res.json(news);
});

initDb();

app.listen(8080);
