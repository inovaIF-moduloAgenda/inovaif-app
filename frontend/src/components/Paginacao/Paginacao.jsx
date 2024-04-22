import Pagination from 'react-bootstrap/Pagination';
import './Paginacao.css';


const Paginacao = ({currentPage, totalPages, onPageChange}) =>{
    const handlePageChange = (page) => {
        onPageChange(page);
      };
    
      const renderPageItems = () => {
        const pageItems = [];
    
        for (let i = 1; i <= totalPages; i++) {
          pageItems.push(
            <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
              {i}
            </Pagination.Item>
          );
        }
    
        return pageItems;
      };
    return(
        <>
      <Pagination className="justify-content-center mt-3">
      <Pagination.First onClick={() => handlePageChange(1)} />
      <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
      {renderPageItems()}
      <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
      <Pagination.Last onClick={() => handlePageChange(totalPages)} />
    </Pagination>
        </>
    )
}
export default Paginacao;
