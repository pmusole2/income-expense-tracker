import React from 'react';
import Moment from 'react-moment';

const DetailList = ({ details }) => {
	return (
		<ul className='list-group mb-4'>
			{details.map(detail => (
				<li key={detail._id} className='list-group-item'>
					{detail.description} K{detail.amount}{' '}
					<Moment format='DD/MM/YYYY'>{detail.madeat}</Moment>
				</li>
			))}
		</ul>
	);
};

export default DetailList;
