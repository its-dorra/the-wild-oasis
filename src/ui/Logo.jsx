import styled from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { isDarkMode } = useDarkMode();

  const sourceImage = isDarkMode ? '/logo-dark.png' : '/logo-light.png';

  return (
    <StyledLogo>
      <Img src={sourceImage} alt='Logo' />
    </StyledLogo>
  );
}

export default Logo;
