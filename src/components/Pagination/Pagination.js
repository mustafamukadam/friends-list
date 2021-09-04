import { useMemo } from "react";
import classNames from 'classnames';
import Icon from "../../theme/Icons";
import './Pagination.style.css';

const Pagination = ({ offset, list, updateOffset }) => {

    const LIMIT = 4;

    const totalPages = Math.ceil(list.length / LIMIT);

    const disableRightPagination = useMemo(() =>
        offset >= (totalPages - 1),
        [totalPages, offset]
    )

    function renderPaginationLinks() {
        let links = [];
        let startPage = offset + 1;
        let limitPage = offset + 3 > totalPages ? totalPages : offset + 3;
        for (let i = startPage; i <= limitPage; i++) {
            links.push(
                <span className={classNames('link', { 'active': i === offset + 1 })} onClick={() => updateOffset(i - 1)} key={i}> {i}</span>
            )
        }
        if (limitPage < totalPages) links.push(
            <>
                <span key="...">. . .</span>
                <span className="link" onClick={() => updateOffset(limitPage)} key={limitPage + 1}>{limitPage + 1}</span>
            </>
        )
        return links;
    }

    return (
        <div className="pagination">
            <div className={classNames('btn-pagination', { 'disabled': offset === 0 })} onClick={() => updateOffset(offset - 1)}>
                <Icon icon={offset === 0 ? 'leftDull' : 'left'} />
            </div>
            {
                renderPaginationLinks()
            }
            <div className={classNames('btn-pagination', { 'disabled': disableRightPagination })} onClick={() => updateOffset(offset + 1)}>
                <Icon icon={disableRightPagination ? 'rightDull' : 'right'} />
            </div>
        </div>
    );
}

export default Pagination;