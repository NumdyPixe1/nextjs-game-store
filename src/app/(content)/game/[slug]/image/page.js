/*http://localhost:3000/news/us-tariff-impact-thai-economy/image
แสดงหน้านี้เมื่อพิมพ์ url โดยตรง
*/
import { getNewsItem } from "@/lib/news";
import { notFound } from "next/navigation";
export default async function ImagePage({params}){
    const {slug} = await params;
    const newsItem = await getNewsItem(slug);
if(!newsItem) notFound();
return (<>
<div className="fullscreen-image">
<img
src={`/images/news/${newsItem.image}`}
alt={newsItem.title}
/>
</div></>);

}