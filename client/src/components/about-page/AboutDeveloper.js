import React from 'react';
import * as img from './Assets/img.jpg';

const AboutDeveloper = () => {
	return (
		<div className='developer-container'>
			<div>
				<img className='dev-img' src={img} alt='' />
				<h5>Prince Musole</h5>
				<p>I am a Mern Stack Developer and Student of Software Engineering</p>
			</div>
			<div>
				<h4>Social Handles</h4>
				<h4>Github</h4>
				<a
					className='btn btn-primary'
					href='http://github.com/pmusole2'
					target='_blank'
					rel='noopener noreferrer'
				>
					Pmusole2
				</a>
				<h4>Twitter</h4>
				<a
					className='btn btn-primary'
					href='http://www.twitter.com/princezuko9222'
					target='_blank'
					rel='noopener noreferrer'
				>
					@Princezuko9222
				</a>
				<h4>Facebook</h4>
				<a
					className='btn btn-primary'
					href='http://facebook.com/pmusole'
					target='_blank'
					rel='noopener noreferrer'
				>
					Prince Musole
				</a>
			</div>
		</div>
	);
};

export default AboutDeveloper;
