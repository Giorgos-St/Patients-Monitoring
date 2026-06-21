import styles from './Pagination.module.css'

const getPageItems = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  const pages = new Set(
    [
      1,
      2,
      totalPages - 1,
      totalPages,
      currentPage - 1,
      currentPage,
      currentPage + 1,
    ].filter((page) => page >= 1 && page <= totalPages),
  )

  const sorted = [...pages].sort((a, b) => a - b)
  const items = []

  sorted.forEach((page, index) => {
    const prev = sorted[index - 1]
    if (index > 0 && page - prev > 1) {
      items.push('...')
    }
    items.push(page)
  })

  return items
}

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const safeTotalPages = Math.max(totalPages, 1)

  const goToPage = (page) => {
    if (page < 1 || page > safeTotalPages) return
    onPageChange(page)
  }

  const pageItems = getPageItems(currentPage, safeTotalPages)

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.navButton}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      <div className={styles.pages}>
        {pageItems.map((item, index) =>
          item === '...' ? (
            <div key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </div>
          ) : (
            <button
              key={item}
              type="button"
              className={item === currentPage ? styles.pageActive : styles.page}
              onClick={() => goToPage(item)}
              aria-current={item === currentPage ? 'page' : undefined}
            >
              {item}
            </button>
          ),
        )}
      </div>

      <button
        type="button"
        className={styles.navButton}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === safeTotalPages}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
