/* Global Not Found Page
http://localhost:3000/abc
*/
import meme2 from "@/assets/meme2.jpg";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="error">
      <img src={meme2.src}></img>
      <h4 style={{ marginTop: "16px" }}>This video isn't available anymore</h4>

      <button className="btn" style={{ marginTop: "16px" }}>
        <Link href="/">Back to Home Page</Link>
      </button>
    </div>
  );
}
