import React, { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";

const PaginationComponent = ({ lastPage = 0, fetchSelectedPage }) => {
	const [currentPage, setCurrentPage] = useState(1);
	useEffect(() => {
		setCurrentPage(1);
	}, [lastPage]);

	const handlePageUpdates = (e, page) => {
		if (page) {
			fetchSelectedPage(page);
			if (page !== currentPage) setCurrentPage(page);
		}
	};

	return (
		<Pagination
			count={lastPage}
			page={currentPage}
			onChange={handlePageUpdates}
			showFirstButton
			showLastButton
			shape={"rounded"}
		/>
	);
};

export default PaginationComponent;
