/* Not Found Page สำหรับ /news/[slug] 
http://localhost:3000/news/abc
*/
export default function NewsNotFoundPage(){
    return<div className="error">
 <h1>News Article Not Found</h1>
 <p>Unfortunately, we could not find the requested article.</p>
    </div>
}