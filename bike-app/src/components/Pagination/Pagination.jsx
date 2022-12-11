import './Pagination.css';

function Pagination(props) {
    const currentPage = props.currentPage;
    const totalPages = props.totalPages;
    const handleFirstButton = props.handleFirstButton;
    const handleSecondButton = props.handleSecondButton;
    const handleThirdButton = props.handleThirdButton;
    const handleLastButton = props.handleLastButton;
    //import button handler functions

    return (
        <div className='pagination'>
                {/*render pagination buttons if no pending api request*/}
            <button disabled= {
                currentPage < 3
                //disable button if page is before page 3
            } onClick= {() => {
                handleFirstButton();
                //return to first page
            }}>◄◄</button>
            <button disabled= {
                currentPage <= 1
                    //disable button if user already on first page
            } onClick={() => {
                handleSecondButton();
                    //go one page back
            }}>◄</button>
                <p>{currentPage} of {totalPages > 0 ? totalPages : 1}</p>
            <button disabled={
                currentPage >= totalPages
                    //disable button if user is on last page
            } onClick={() => {
                handleThirdButton();
                    //go one page forward
            }}>►</button>
            <button disabled= {
                currentPage >= totalPages - 1
                    //disable button if user is on last 2 pages
            } onClick= {() => {
                handleLastButton();
                    //send user to last page
            }}>►►</button>
        </div>
    )
}

export default Pagination;