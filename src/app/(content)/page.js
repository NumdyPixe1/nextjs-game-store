import Link from "next/link";

export default async function GamePage() {
  return (
    <>
      <div className="main-page">
        <h1>Welcome to Game Store</h1>
        <button className="btn" style={{ marginTop: "16px" }}>
          <Link href="/game">Go to Game Page</Link>
        </button>
      </div>
    </>
  );
}
