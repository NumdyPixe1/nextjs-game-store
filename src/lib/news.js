import sql from "better-sqlite3";
import fs from "fs/promises";

const db = sql("data.db");

const DUMMY_NEWS = [
  {
    id: "n3",
    slug: "bimstec-leaders-sign-agreements",
    title: "7 ผู้นำบิมสเทค ลงนามเอกสาร 6 ฉบับ ชู วิสัยทัศน์กรุงเทพฯ",
    image: "bimstec-summit.jpg",
    date: "2025-04-05",
    content:
      "ผู้นำจาก 7 ประเทศสมาชิกบิมสเทคได้ลงนามในเอกสาร 6 ฉบับ เพื่อส่งเสริมวิสัยทัศน์กรุงเทพฯ ที่มุ่งสร้างความมั่งคั่ง ยั่งยืน ฟื้นคืน และเปิดกว้าง",
  },
  {
    id: "n1",
    slug: "us-tariff-impact-thai-economy",
    title: "ส.อ.ท. ประเมินสหรัฐฯขึ้นภาษี ทำไทยเสียหายสูง 8-9 แสนล้านบาท",
    image: "us-tariff.jpg",
    date: "2025-04-04",
    content:
      "นายเกรียงไกร เธียรนุกุล ประธานสภาอุตสาหกรรมแห่งประเทศไทย (ส.อ.ท.) เปิดเผยว่าการขึ้นภาษีของสหรัฐฯ อาจทำให้ไทยเสียหายสูงถึง 8-9 แสนล้านบาท และเรียกร้องให้รัฐบาลเร่งเจรจาต่อรอง",
  },
  {
    id: "n4",
    slug: "val-kilmer-passes-away",
    title:
      "วัล คิลเมอร์ ผู้รับบทแบทแมนใน “Batman Forever” เสียชีวิตในวัย 65 ปี",
    image: "val-kilmer.jpg",
    date: "2025-04-02",
    content:
      "วัล คิลเมอร์ นักแสดงชื่อดังที่เคยรับบทเป็นแบทแมนในภาพยนตร์ “Batman Forever” ได้เสียชีวิตลงในวัย 65 ปี",
  },
  {
    id: "n2",
    slug: "lisa-oscar-performance",
    title: "ลิซ่า สร้างประวัติศาสตร์! โชว์สุดพิเศษบนเวทีออสการ์ ครั้งที่ 97",
    image: "lisa-oscar.jpg",
    date: "2025-03-02",
    content:
      "ลิซ่า สมาชิกวง BLACKPINK ได้สร้างประวัติศาสตร์ด้วยการแสดงสุดพิเศษบนเวทีออสการ์ ครั้งที่ 97",
  },
  {
    id: "n5",
    slug: "gene-hackman-passes-away",
    title: "ปิดตำนาน Gene Hackman นักแสดงดัง 2 ผลงานออสการ์",
    image: "gene-hackman.jpg",
    date: "2025-02-28",
    content:
      "Gene Hackman นักแสดงชื่อดังเจ้าของรางวัลออสการ์ 2 สมัย ได้เสียชีวิตลง",
  },
];

function initDb() {
  db.exec(
    "CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY, slug TEXT UNIQUE, title TEXT, content TEXT, date TEXT, image TEXT)"
  );

  const { count } = db.prepare("SELECT COUNT(*) as count FROM news").get();

  if (count === 0) {
    const insert = db.prepare(
      "INSERT INTO news (slug, title, content, date, image) VALUES (?, ?, ?, ?, ?)"
    );

    DUMMY_NEWS.forEach((news) => {
      insert.run(news.slug, news.title, news.content, news.date, news.image);
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

export async function addNews(news, image) {
  const { slug, title, content, date } = news;
  const insert = db.prepare(
    "INSERT INTO news (slug, title, content, date, image) VALUES (?, ?, ?, ?, ?)"
  );
  const result = insert.run(slug, title, content, date, "");
  const id = result.lastInsertRowid;
  //ป้องกันการตั้งชื่อ image ซ้ำกัน
  const imageFile = `news-${id}.${image.name.split(".").pop()}`;

  /*
  ถ้ามี image ส่งมา 
  ทำการเขียนไฟล์
  */
  if (image) {
    await fs.writeFile(
      `@/../public/images/news/${imageFile}`,
      Buffer.from(await image.arrayBuffer())
    );
    db.prepare("UPDATE news SET image = ? WHERE id = ?").run(imageFile, id);
  }

  return { id, slug, title, content, date, image: imageFile };
}

export async function updateNews(news, file) {
  console.log(news);
  const { id, slug, title, content, date } = news;
  if (file.size > 0) {
    let { image } = db.prepare("SELECT image FROM news WHERE id = ?").get(id);
    //ลบไฟล์เก่าทิ้ง
    await fs.unlink(`@/../public/images/news/${image}`).catch(() => {});
    const imageFile = `news-${id}.${file.name.split(".").pop()}`;
    //สร้างไฟล์ใหม่
    await fs.writeFile(
      `@/../public/images/news/${imageFile}`,
      Buffer.from(await file.arrayBuffer())
    );
    db.prepare(
      "UPDATE news SET slug = ?, title = ?, content = ?, date = ?, image = ? WHERE id = ?"
    ).run(slug, title, content, date, imageFile, id);

    return { ...news, image: imageFile };
  } else {
    db.prepare(
      "UPDATE news SET slug = ?, title = ?, content = ?, date = ? WHERE id = ?"
    ).run(slug, title, content, date, id);

    return news;
  }
}

//ลบ image ทิ้ง
export async function deleteNews(id) {
  const { image } = db.prepare("SELECT * FROM news WHERE id = ?").get(id);
  db.prepare("DELETE FROM news WHERE id = ?").run(id);
  await fs.unlink(`@/../public/images/news/${image}`).catch(() => {});
}
