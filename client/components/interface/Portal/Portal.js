/* eslint-disable no-unused-vars */
import React from 'react';
import { StyledPortal } from './Portal.styled';
import { Login } from '../../views/AuthForm';
import Loading from '../../views/Loading/Loading';

export const Portal = ({ Component, props, auth, preCheck }) => {
	return (
		<StyledPortal>
			<main id="main-portal">
				{!preCheck ? <Loading /> : <Component auth={auth} {...props} />}
			</main>
		</StyledPortal>
	);
};
export default Portal;
