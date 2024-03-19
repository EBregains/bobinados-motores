export function generatePageNumbers(currentPage: number, totalPages: number) {
  // Less than 7 returns all the pages
  if (totalPages <= 7)
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  // If is more will check if current page is on the right or left side of the elipsis
  // Left Side ===
  if ( currentPage <= 3 )
    return [1,2,3, '...' , totalPages - 1, totalPages]
  // Right Side ===
  if ( currentPage >= totalPages - 2 )
    return [1,2, '...' ,totalPages - 2, totalPages - 1, totalPages]
  // Else is going to be in more than 7 pages and the index could be elsewhere
    return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages
    ]
}