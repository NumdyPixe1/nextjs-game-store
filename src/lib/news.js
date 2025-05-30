import sql from "better-sqlite3";
import fs from "fs/promises";

const db = sql("data.db");

const DUMMY_NEWS = [
  //อย่าลืมใส่
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

function initDb() {
  //อย่าลืมใส่
  db.exec(
    "CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY, slug TEXT UNIQUE, title TEXT, content TEXT, price TEXT,   date TEXT, image TEXT)"
  );

  const { count } = db.prepare("SELECT COUNT(*) as count FROM news").get();

  if (count === 0) {
    const insert = db.prepare(
      //อย่าลืมใส่
      "INSERT INTO news (slug, title, content, price,   date, image) VALUES (?, ?, ?, ?, ?,?,?)"
    );

    DUMMY_NEWS.forEach((news) => {
      //อย่าลืมใส่
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

initDb();

export async function getAllNews() {
  const news = db.prepare("SELECT * FROM news").all();
  return news;
}

export async function getNewsItem(slug) {
  const newsItem = db.prepare("SELECT * FROM news WHERE slug = ?").get(slug);

  return newsItem;
}

export async function getLatestNews() {
  const latestNews = db
    .prepare("SELECT * FROM news ORDER BY date DESC LIMIT 3")
    .all();
  return latestNews;
}
/*
export async function getAvailableNewsYears() {
  const years = db
    .prepare("SELECT DISTINCT strftime('%Y', date) as year FROM news")
    .all()
    .map((year) => year.year);

  return years;
}

export async function getAvailableNewsMonths(year) {
  return db
    .prepare(
      "SELECT DISTINCT strftime('%m', date) as month FROM news WHERE strftime('%Y', date) = ?"
    )
    .all(year)
    .map((month) => month.month);
}

export async function getNewsForYear(year) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? ORDER BY date DESC"
    )
    .all(year);

  return news;
}


export async function getNewsForYearAndMonth(year, month) {
  const news = db
    .prepare(
      "SELECT * FROM news WHERE strftime('%Y', date) = ? AND strftime('%m', date) = ? ORDER BY date DESC"
    )
    .all(year, month);

  return news;
}
*/
export async function addNews(news, image) {
  //อย่าลืมใส่
  const { slug, title, content, price, date } = news;
  const insert = db.prepare(
    //อย่าลืมใส่
    "INSERT INTO news (slug, title, content, price,   date, image) VALUES (?,?, ?, ?, ?, ?)"
  );
  //อย่าลืมใส่
  const result = insert.run(slug, title, content, price, date, "");
  const id = result.lastInsertRowid;
  //ป้องกันการตั้งชื่อ image ซ้ำกัน
  const imageFile = `game-${id}.${image.name.split(".").pop()}`;

  /*
  ถ้ามี image ส่งมา 
  ทำการเขียนไฟล์
  */
  if (image) {
    await fs.writeFile(
      `@/../public/images/games/${imageFile}`,
      Buffer.from(await image.arrayBuffer())
    );
    db.prepare("UPDATE news SET image = ? WHERE id = ?").run(imageFile, id);
  }
  //อย่าลืมใส่
  return { id, slug, title, content, price, date, image: imageFile };
}

export async function updateNews(news, file) {
  console.log(news);
  //อย่าลืมใส่
  const { id, slug, title, content, price, date } = news;
  if (file.size > 0) {
    let { image } = db.prepare("SELECT image FROM news WHERE id = ?").get(id);
    //ลบไฟล์เก่าทิ้ง
    await fs.unlink(`@/../public/images/games/${image}`).catch(() => {});
    const imageFile = `game-${id}.${file.name.split(".").pop()}`;
    //สร้างไฟล์ใหม่
    await fs.writeFile(
      `@/../public/images/games/${imageFile}`,
      Buffer.from(await file.arrayBuffer())
    );
    db.prepare(
      //อย่าลืมใส่
      "UPDATE news SET slug = ?, title = ?, content = ?, price = ?,   date = ?, image = ? WHERE id = ?"
    ).run(slug, title, content, price, date, imageFile, id);

    return { ...news, image: imageFile };
  } else {
    db.prepare(
      //อย่าลืมใส่
      "UPDATE news SET slug = ?, title = ?, content = ?, price = ?,   date = ? WHERE id = ?"
    ).run(slug, title, content, price, date, id);

    return news;
  }
}

//ลบ image ทิ้ง
export async function deleteNews(id) {
  const { image } = db.prepare("SELECT * FROM news WHERE id = ?").get(id);
  db.prepare("DELETE FROM news WHERE id = ?").run(id);
  await fs.unlink(`@/../public/images/games/${image}`).catch(() => {});
}
