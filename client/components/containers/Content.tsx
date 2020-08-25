import styled from 'styled-components';
import { getColor } from '../../utils/colors';

const Main = styled.main`
  flex: 1;
  overflow: auto;
  padding: 24px;
`;

const NameInput = styled.input`
  width: 100%;
  border: none;
  display: block;
  font-family: 'Krona One', sans-serif;
  color: ${getColor('primary')};
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 8px;
  ::placeholder {
    color: ${getColor('primary', 40)};
  }
`;

const DescriptionInput = styled.textarea`
  width: 100%;
  border: none;
  display: block;
  font-family: 'Work Sans', sans-serif;
  color: ${getColor('primary')};
  font-size: 18px;
  line-height: 24px;
  margin-bottom: 8px;
  resize: vertical;
  min-height: 40px;
  max-height: 160px;
  background: url("<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 11.8487 17.3729 13.551 16.3199 14.9056L21.7071 20.2929L20.2929 21.7071L14.9056 16.3199C13.551 17.3729 11.8487 18 10 18ZM16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10Z" fill="#1F2D5F"/>
</svg>
")
  ::placeholder {
    color: ${getColor('primary', 40)};
  }
`;

const ButtonPrimary = styled.button`
  background-color: ${getColor('secondary')};
  border: none;
  font-family: 'Krona One', sans-serif;
  line-height: 40px;
  color: white;
  padding: 0px 16px;
  cursor: pointer;
  transition: 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    transform: translateY(-4px) rotate(-1deg);
  }
`;

const Content = () => (
  <Main>
    <NameInput
      type="text"
      name="name"
      id="assistantName"
      placeholder="Name (Optional)"
    />
    <DescriptionInput
      name="description"
      id="assistantDescription"
      placeholder="Description (Optional)"
    />
    <h1>Rules</h1>
    <h1>Preferences</h1>
    <ButtonPrimary>Create</ButtonPrimary>
  </Main>
);

export default Content;
