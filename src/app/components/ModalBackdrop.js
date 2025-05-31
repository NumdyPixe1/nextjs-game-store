"use client";
import { useRouter } from "next/navigation";
export default function ModalBackdrop({ children }) {
  const router = useRouter();
  return (
    //  แสดงภาพเป็นรูปแบบ modal
    <div className="modal-backdrop" onClick={router.back}>
      {children}
    </div>
  );
}
