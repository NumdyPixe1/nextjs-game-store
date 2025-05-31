import meme1 from "@/assets/meme1.webp";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="error">
      <img src={meme1.src}></img>
      <h4 style={{ marginTop: "16px" }}>
        This page isn't available. Sorry about that. Try searching for something
        else.
      </h4>
      <button className="btn" style={{ marginTop: "16px" }}>
        <Link href="/">Back to Home Page</Link>
      </button>
    </section>
  );
}
