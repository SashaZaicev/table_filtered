import React, {useState} from 'react';
import './TableBlock.scss'

const Pagination = ({transportListAll, setTransportList}) => {
        const [currentPage, setCurrentPage] = useState(1)
        const [recordsPerPage, setRecordsPerPage] = useState(5)

        const [pageNumberLimit, setPageNumberLimit] = useState(5)
        const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
        const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)


        const pagesCount = Math.ceil(transportListAll.length / recordsPerPage);

        const pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        const onPageChanged = (pageNumber) => {
            setCurrentPage(Number(pageNumber))
        }
        const renderPageNumber = pages.map(number => {
            if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                return <li
                    key={number + 1}
                    className={currentPage === number && 'selectedPage'}
                    onClick={(e) => {
                        onPageChanged(number)
                    }}>
                    {number} </li>
            } else {
                return null
            }
        })
        const indexOfLastItem = currentPage * recordsPerPage
        const indexOfFirstItem = indexOfLastItem - recordsPerPage
        const currentItems = transportListAll.slice(indexOfFirstItem, indexOfLastItem)

        const prevPage = () => {
            setCurrentPage(currentPage - 1);
            if ((currentPage - 1) % pageNumberLimit == 0) {
                setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
                setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
            }
        }
        const nextPage = () => {
            setCurrentPage(currentPage + 1);
            if (currentPage + 1 > maxPageNumberLimit) {
                setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
                setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
            }
        }
        //На доработку
        // let pageIncrementBtn = null;
        // if (pagesCount > maxPageNumberLimit) {
        //     pageIncrementBtn = <li onClick={nextPage}>&hellip;</li>
        // }
        // let pageDecrementBtn = null;
        // if (minPageNumberLimit <= 1) {
        //     pageDecrementBtn = <li onClick={prevPage}>&hellip;</li>
        // }

        return (
            <>
                <tbody>
                {currentItems}
                </tbody>
                <tr>
                    <td className={'pagination'} colspan={"4"}>
                        <div className={'paginationBlock'}>
                            <div className={'paginationBlockBtn'}>
                                <button onClick={prevPage} disabled={currentPage == pages[0] ? true : false}>PREV</button>
                            </div>
                            <div>
                                <ul className={'pageNumbers'}>
                                    {/*{pageIncrementBtn}*/}
                                    {renderPageNumber}
                                    {/*{pageDecrementBtn}*/}
                                </ul>
                            </div>
                            <div className={'paginationBlockBtn'}>
                                <button onClick={nextPage}
                                        disabled={currentPage == pages[pages.length - 1] ? true : false}>NEXT
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            </>

        );
    }
;

export default Pagination;