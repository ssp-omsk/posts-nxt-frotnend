import { Pagination } from "./Pagination";
import { SelectLimit } from "./SelectLimit";

type Props = {
  totalCount: number;
  currentPage: number;
  pageLimit: number;
  limits: Array<number>;
  setCurrentPage: (page: number) => void
  setPageLimit: (page: number) => void
}

export const PaginationContainer = ({ totalCount, currentPage, pageLimit, limits, setCurrentPage, setPageLimit }: Props) => {

  const onChangeLimit = (value: string) => {
    if (parseInt(value) >= totalCount) {
      setPageLimit(totalCount);
    }
    setCurrentPage(1);
    setPageLimit(parseInt(value));
  }

  const paginate = (page: number) => {
    setCurrentPage(page);
  }
  const nextPage = (page: number) => setCurrentPage((page + 1));
  const prevPage = (page: number) => setCurrentPage((page - 1));
  const firstPage = () => setCurrentPage(1);
  const lastPage = (page: number) => setCurrentPage(page);

  return (
    <div  className="flex flex-row-reverse items-center justify-between w-full">
      <Pagination
        totalCount={totalCount}
        pageLimit={pageLimit}
        currentPage={currentPage}
        paginate={paginate}
        nextPage={nextPage}
        prevPage={prevPage}
        firstPage={firstPage}
        lastPage={lastPage}
      />
      <SelectLimit onChangeLimit={onChangeLimit} limits={limits} />
    </div>

  )
}