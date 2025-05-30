export default function NewsDetailLayout({children, modal}){
return (<>
    {/*modal = UI ชนิดหนึ่ง ที่ใช้แสดงผลข้อมูลหรือการโต้ตอบกับผู้ใช้ โดยที่ยังคงอยู่ในหน้าต่างปัจจุบัน */}
    {/* เนื้อหาของ Parallel Routes ชื่อ @modal*/}
    {modal}
    {/* เนื้อหาหลักของข่าว */}
    {children}
    </>
);
}