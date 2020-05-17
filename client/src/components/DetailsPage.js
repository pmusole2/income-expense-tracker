import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import DetailList from './DetailList';
import Pagination from './Pagination';

const DetailsPage = ({ details, loading }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [logsPerPage] = useState(8);

	if (details == null && !loading) {
		return <h2>You do not have any transactions on here</h2>;
	}

	// Get Current post
	const indexOfLastLog = currentPage * logsPerPage;
	const indexOfFirstLog = indexOfLastLog - logsPerPage;
	const currentLog = details.slice(indexOfFirstLog, indexOfLastLog);

	const paginate = pageNumber => setCurrentPage(pageNumber);
	return (
		<Fragment>
			<div style={styles}>
				<h3 className='mb-3'>
					Transaction Details || {details[0].type.toUpperCase()}
				</h3>
			</div>
			<DetailList details={currentLog} />
			<Pagination
				logsPerPage={logsPerPage}
				totalLogs={details.length}
				paginate={paginate}
			/>
		</Fragment>
	);
};

const mapStateToProps = state => ({
	details: state.transaction.details,
	loading: state.transaction.loading,
});

const styles = {
	marginTop: '130px',
};

export default connect(mapStateToProps)(DetailsPage);
