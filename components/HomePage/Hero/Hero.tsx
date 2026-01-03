// const Hero = () => {
//   return (
//     <div className="flex gap-9 max-w-screen-xl mx-auto px-12">
//       <div className="w-3/4 border border-black/10">
//         <div
//           className="w-full h-full p-8 relative bg-cover bg-center bg-no-repeat"
//           style={{
//             backgroundImage: `linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0)), url(${article.imageUrl})`,
//           }}
//         >
//           <div className="w-3/5 space-y-3">
//             <h2 className="text-4xl font-extrabold italic">{article.title}</h2>
//             <div className="flex gap-3">
//               <p className="text-sm font-medium">{article.author.name}</p>
//               <p className="text-sm font-medium">{article.publishedAt}</p>
//             </div>
//             <p className="font-secondary leading-tight">{article.exerpt}</p>
//           </div>
//           <div className="w-fit [clip-path:polygon(25%_0,100%_0,100%_100%,0%_100%)] py-5 bg-neutral pr-12 pl-24 absolute bottom-0 right-0">
//             <h4 className="text-primary-red font-secondary text-4xl">
//               {article.category}
//             </h4>
//           </div>
//         </div>
//       </div>
//       <div className="w-1/4 bg-neutral pr-14 pl-8 py-3 space-y-5">
//         <h3 className="italic text-3xl">Catch up</h3>
//         {articles.map((article, index) => (
//           <div key={index}>
//             <div
//               // 3. Added bg-cover, bg-center, bg-no-repeat to the list items as well
//               className="w-full p-8 relative border h-40 border-black/10 mb-5 bg-cover bg-center bg-no-repeat"
//               style={{
//                 backgroundImage: `url(${article.imageUrl})`,
//               }}
//             >
//               {/* Note: If you want the div to be a fixed height, add h-64 or similar here.
//               Currently, height is determined by the padding (p-8). */}
//               <div className="[clip-path:polygon(0_0,75%_0,100%_100%,0%_100%)] w-fit bg-white py-2 pl-5 pr-10 absolute bottom-0 left-0 right-0">
//                 <h5 className="text-primary-red font-secondary">
//                   {article.category.name}
//                 </h5>
//               </div>
//             </div>
//             <h5 className="font-black text-lg tracking-wider leading-tight mb-2">
//               {article.title}
//             </h5>
//             <div className="flex gap-3">
//               <p className="text-sm font-medium">{article.author.name}</p>
//               <p className="text-sm font-medium">{article.publishedAt}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Hero;
