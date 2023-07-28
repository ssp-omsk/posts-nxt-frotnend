type Props = {
  totalCount: number;
  pageLimit: number;
  currentPage: number;
  paginate: (page: number) => void;
  nextPage: (page: number) => void;
  prevPage: (page: number) => void;
  firstPage: () => void;
  lastPage: (page: number) => void;
}
export const Pagination = ({ totalCount, pageLimit, currentPage, paginate, nextPage, prevPage, firstPage, lastPage }: Props) => {

  let pages: Array<number> = [];

  const createPages = (pages: Array<number>, pagesCount: number, currentPage: number, pageLimit: number) => {
    if (pagesCount / pageLimit > 10) {
      if (currentPage > 5) {
        for (let i = currentPage - 4; i <= currentPage + 5; i++) {
          pages.push(i)
          if (i === pagesCount) break;
        }
      } else {
        for (let i = 1; i <= 10; i++) {
          pages.push(i)
          if (i === pagesCount) break;
        }
      }
    } else {
      for (let i = 1; i <= Math.ceil(pagesCount / pageLimit); i++) {
        pages.push(i)
      }
    }
  }

  createPages(pages, totalCount, currentPage, pageLimit);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mb-2">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button onClick={firstPage} disabled={currentPage === 1 ? true : false} className="relative pl-4 pr-4 inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              &laquo;
            </button>
            <button onClick={() => prevPage(currentPage)} disabled={currentPage === 1 ? true : false} className="relative pl-4 pr-4 inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span className="sr-only">Previous</span>
              &lsaquo;
            </button>
            {pages.map(page => {
              return (
                <button key={page} onClick={() => paginate(page)}
                  disabled={page === currentPage ? true : false}
                  className={page === currentPage ?
                    `relative z-10 inline-flex items-center bg-indigo-600 px-4
               py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline
                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600` :
                    `relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1
                 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}>{page}
                </button>
              )
            })}
            <button onClick={() => nextPage(currentPage)}
              disabled={currentPage === Math.ceil(totalCount / pageLimit) ? true : false}
              className="relative pl-4 pr-4 inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              &rsaquo;
            </button>
            <button onClick={() => lastPage(Math.ceil(totalCount / pageLimit))}
              disabled={currentPage === Math.ceil(totalCount / pageLimit) ? true : false}
              className="relative pl-4 pr-4 inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              &raquo;
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}