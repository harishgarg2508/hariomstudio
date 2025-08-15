// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, ChevronLeft, ChevronRight } from 'lucide-react';
// import { GalleryItem } from '../types/gallery';
// import Image from 'next/image';

// interface FullScreenSliderProps {
//   items: GalleryItem[];
//   initialIndex: number;
//   onClose: () => void;
// }
// const handleRightClick = (e: React.MouseEvent) => {
//   e.preventDefault();
//   return false;
// };

// export function FullScreenSlider({ items, initialIndex, onClose }: FullScreenSliderProps) {
//   const [currentIndex, setCurrentIndex] = useState(initialIndex);
//   const [imageError, setImageError] = useState(false);

//   const handlePrevious = useCallback(() => {
//     setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
//     setImageError(false);
//   }, [items.length]);

//   const handleNext = useCallback(() => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
//     setImageError(false);
//   }, [items.length]);

//   const handleKeyDown = useCallback((e: KeyboardEvent) => {
//     if (e.key === 'ArrowLeft') handlePrevious();
//     if (e.key === 'ArrowRight') handleNext();
//     if (e.key === 'Escape') onClose();
//   }, [handlePrevious, handleNext, onClose]);

//   useEffect(() => {
//     document.addEventListener('keydown', handleKeyDown);
//     return () => document.removeEventListener('keydown', handleKeyDown);
//   }, [handleKeyDown]);

//   const handleImageError = () => {
//     setImageError(true);
//   };

//   const renderContent = (item: GalleryItem) => {
//     if (item.type === 'video') {
//       const videoId = item.url.split('v=')[1];
//       return (
//         <div className="w-full h-full flex items-center justify-center">
//           <iframe
//             width="100%"
//             height="100%"
//             src={`https://www.youtube.com/embed/${videoId}`}
//             title={item.title || 'Video'}
//             frameBorder="0"
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//           ></iframe>
//         </div>
//       );
//     } else {
//       return (
//         <div className="relative w-full h-full">
//           {imageError ? (
//             <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
//               Image not available
//             </div>
//           ) : (
//             <Image
//               src={item.url}
//               alt={item.title || 'Full screen image'}
//               fill
//               sizes="100vw"
//               className="object-contain"
//               priority
//               onError={handleImageError}
//               onContextMenu={handleRightClick}
//             />
//           )}
//         </div>
//       );
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
//     >
//       <button
//         onClick={onClose}
//         className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
//       >
//         <X className="h-6 w-6" />
//       </button>
//       <div className="relative flex-grow w-full flex items-center justify-center">
//         <button
//           onClick={handlePrevious}
//           className="absolute left-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
//         >
//           <ChevronLeft className="h-6 w-6" />
//         </button>
//         <button
//           onClick={handleNext}
//           className="absolute right-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
//         >
//           <ChevronRight className="h-6 w-6" />
//         </button>
//         <AnimatePresence initial={false} mode="wait">
//           <motion.div
//             key={currentIndex}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="w-full h-full flex items-center justify-center"
//           >
//             {renderContent(items[currentIndex])}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//       <div className="w-full bg-black/50 p-4">
//         <div className="flex justify-center space-x-2 overflow-x-auto">
//           {items.map((item, index) => (
//             <button
//               key={item.id}
//               onClick={() => {
//                 setCurrentIndex(index);
//                 setImageError(false);
//               }}
//               className={`flex-shrink-0 ${index === currentIndex ? 'ring-2 ring-white' : ''}`}
//             >
//               {item.type === 'video' ? (
//                 <div className="w-[60px] h-[60px] bg-gray-800 flex items-center justify-center rounded-md">
//                   <ChevronRight className="h-6 w-6 text-white" />
//                 </div>
//               ) : (
//                 <div className="relative w-[60px] h-[60px]">
//                   <Image
//                     src={item.url}
//                     alt={item.title || 'Thumbnail'}
//                     fill
//                     sizes="60px"
//                     className="object-cover rounded-md"
//                     onError={handleImageError}
//                   />
//                 </div>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="absolute bottom-20 left-4 rounded-md bg-white/10 p-2 text-white backdrop-blur-sm">
//         <h3 className="text-lg font-bold">{items[currentIndex].title}</h3>
//         <p className="text-sm">{items[currentIndex].description}</p>
//       </div>
//     </motion.div>
//   );
// }

