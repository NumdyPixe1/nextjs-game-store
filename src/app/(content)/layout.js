//ให้ news, archive อยู่ภายใต้ layout ตัวนี้
import MainHeader from "../components/main-header";
export const metadata = {
  title: " ",
  description: "  ",
};

export default function ContentLayout({ children }) {
  return (
    <div id="page">
      <MainHeader />
      {/* news, archive */}
      {children}
    </div>
  );
}
