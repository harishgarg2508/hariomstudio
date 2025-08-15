// 'use client';

// import { motion } from 'framer-motion';
// import { Play } from 'lucide-react';
// import { useInView } from 'react-intersection-observer';
// import { useState } from 'react';
// import { GalleryItem as GalleryItemType } from '../types/gallery';
// import { Modal } from './Modal';

// interface Props {
//   item: GalleryItemType;
// }

// export function VideoItem({ item }: Props) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [ref, inView] = useInView({
//     triggerOnce: true,
//     threshold: 0.2
//   });

//   const videoId = item.url.split('v=')[1];
//   const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

//   return (
//     <>
//       <motion.div
//         ref={ref}
//         initial={{ opacity: 0, y: 50 }}
//         animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
//         transition={{ duration: 0.8, ease: "easeOut" }}
//         className="group relative col-span-2 overflow-hidden rounded-xl lg:col-span-2"
//       >
//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.3 }}
//           className="relative aspect-video w-full overflow-hidden"
//           onClick={() => setIsModalOpen(true)}
//         >
//           <img
//             src={thumbnailUrl}
//             alt={item.title}
//             className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
//           />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
//               <Play className="h-8 w-8 text-white" />
//             </div>
//           </div>
//           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//           <div className="absolute bottom-0 left-0 right-0 p-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
//             <h3 className="text-xl font-bold">{item.title}</h3>
//             <p className="mt-2 text-sm">{item.description}</p>
//             <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-sm">
//               {item.category}
//             </span>
//           </div>
//         </motion.div>
//       </motion.div>

//       <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//         <div className="aspect-video w-full">
//           <iframe
//             src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             className="h-full w-full rounded-lg"
//           />
//         </div>
//       </Modal>
//     </>
//   );
// }