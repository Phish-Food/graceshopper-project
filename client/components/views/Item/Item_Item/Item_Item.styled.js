import styled from 'styled-components';

export const StyledItem_Item = styled.div`
	width: 300px;
	${'' /* border: 1px solid red; */}
	margin: 5px 0;
	background-color: ${({ theme }) => theme.colors.primaryLight};
	a:hover {
		color: ${({ theme }) => theme.colors.lightGray};
	}

	a {
		header {
			#item-section {
				justify-content: center;
				img {
					width: 100%;
					padding: 5px;
					border-radius: 8px;
				}
			}
		}
		div {
			padding: 5px;
		}
	}
`;
