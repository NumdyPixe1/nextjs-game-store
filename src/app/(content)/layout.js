//ให้ news, archive อยู่ภายใต้ layout ตัวนี้
import MainHeader from "../components/main-header";
export const metadata = {
  title: "Next.js Page Routing & Rendering",
  description: "Learn how to route to different pages.",
};

export default function ContentLayout({ children }) {
  return (
    <div id="page">
      <MainHeader />
      {/* Show news page, archive page*/}
      {children}
    </div>
  );
}
