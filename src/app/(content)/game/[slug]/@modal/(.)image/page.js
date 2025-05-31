/*http://localhost:3000/news/us-tariff-impact-thai-economy/image
Intercepted Route = แยกว่าต้นทางมาจากไหน
แสดงหน้านี้เมื่อมีการคลิก link ในเว็บ
*/
//Components ที่ต้องรับรู้ทางฝั่ง Client
import ModalBackdrop from "@/app/components/ModalBackdrop";
import { getNewsItem } from "@/lib/game";
import { notFound } from "next/navigation";
export default async function InterceptedImageModal({ params }) {
  const { slug } = await params;
  const newsItem = await getNewsItem(slug);
  if (!newsItem) notFound();
  return (
    <>
      {/* แสดงภาพเป็นรูปแบบ modal */}
      <ModalBackdrop>
        <dialog open className="modal">
          <img src={`/images/games/${newsItem.image}`} alt={newsItem.title} />
        </dialog>
      </ModalBackdrop>
    </>
  );
}

{
  /*stopPropagation = หยุดการส่งไปที่ parent อื่น (ถ้าไม่ใส่จะทำให้กลับไปหน้าข่าว เมื่อกดที่รูปภาพ)*/
}
