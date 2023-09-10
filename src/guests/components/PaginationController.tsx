import { Meta } from '../interfaces/guests';

export const PaginationController = ({
  meta,
  onPageChange,
}: {
  meta: Meta;
  onPageChange: (page: any) => void;
}) => {
  const { totalPages, page, hasNextPage } = meta;

  // Manejar el cambio de página
  const handlePageClick = (currentPage: number) => {
    if (currentPage >= 1 && currentPage <= totalPages) {
      onPageChange(currentPage);
    }
  };

  return (
    <nav>
      <ul className='inline-flex text-sm'>
        {/* Botón de página anterior */}
        <li>
          <button
            type='button'
            className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ${
              page === 1 ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : ''
            }`}
            onClick={() => handlePageClick(page - 1)}
            disabled={page === 1}
          >
            Anterior
          </button>
        </li>

        {/* Botones de números de página */}
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNumber = i + 1;

          return (
            <li key={pageNumber}>
              <button
                type='button'
                className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover-bg-gray-100 hover:text-gray-700 ${
                  page === pageNumber ? 'bg-gray-300 text-gray-700' : ''
                }`}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        {/* Botón de página siguiente */}
        <li>
          <button
            type='button'
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover-bg-gray-100 hover:text-gray-700 ${
              hasNextPage ? '' : 'bg-gray-300 text-gray-700 cursor-not-allowed'
            }`}
            onClick={() => handlePageClick(page + 1)}
            disabled={!hasNextPage}
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>
  );
};
