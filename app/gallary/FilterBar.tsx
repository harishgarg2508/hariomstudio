// 'use client';

// import { Filter } from 'lucide-react';
// import { motion } from 'framer-motion';

// interface FilterBarProps {
//   isFilterOpen: boolean;
//   setIsFilterOpen: (value: boolean) => void;
//   selectedCategory: string | null;
//   setSelectedCategory: (category: string | null) => void;
//   selectedType: 'all' | 'image' | 'video';
//   setSelectedType: (type: 'all' | 'image' | 'video') => void;
//   categories: string[];
// }

// export function FilterBar({
//   isFilterOpen,
//   setIsFilterOpen,
//   selectedCategory,
//   setSelectedCategory,
//   selectedType,
//   setSelectedType,
//   categories,
// }: FilterBarProps) {
//   return (
//     <>
//       <div className="mb-8 flex items-center justify-between gap-4">
//         <button
//           onClick={() => setIsFilterOpen(!isFilterOpen)}
//           className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
//         >
//           <Filter size={20} />
//           Filters
//         </button>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setSelectedType('all')}
//             className={`rounded-full px-4 py-2 text-sm transition-colors ${
//               selectedType === 'all'
//                 ? 'bg-white text-gray-900'
//                 : 'bg-white/10 text-white hover:bg-white/20'
//             }`}
//           >
//             All Types
//           </button>
//           <button
//             onClick={() => setSelectedType('image')}
//             className={`rounded-full px-4 py-2 text-sm transition-colors ${
//               selectedType === 'image'
//                 ? 'bg-white text-gray-900'
//                 : 'bg-white/10 text-white hover:bg-white/20'
//             }`}
//           >
//             Images
//           </button>
//           <button
//             onClick={() => setSelectedType('video')}
//             className={`rounded-full px-4 py-2 text-sm transition-colors ${
//               selectedType === 'video'
//                 ? 'bg-white text-gray-900'
//                 : 'bg-white/10 text-white hover:bg-white/20'
//             }`}
//           >
//             Videos
//           </button>
//         </div>
//       </div>

//       {isFilterOpen && (
//         <motion.div
//           initial={{ opacity: 0, height: 0 }}
//           animate={{ opacity: 1, height: 'auto' }}
//           exit={{ opacity: 0, height: 0 }}
//           className="mb-8"
//         >
//           <div className="flex flex-wrap gap-2">
//             <button
//               onClick={() => setSelectedCategory(null)}
//               className={`rounded-full px-4 py-2 text-sm transition-colors ${
//                 selectedCategory === null
//                   ? 'bg-white text-gray-900'
//                   : 'bg-white/10 text-white hover:bg-white/20'
//               }`}
//             >
//               All Categories
//             </button>
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => setSelectedCategory(category)}
//                 className={`rounded-full px-4 py-2 text-sm transition-colors ${
//                   selectedCategory === category
//                     ? 'bg-white text-gray-900'
//                     : 'bg-white/10 text-white hover:bg-white/20'
//                 }`}
//               >
//                 {category}
//               </button>
//             ))}
//           </div>
//         </motion.div>
//       )}
//     </>
//   );
// }