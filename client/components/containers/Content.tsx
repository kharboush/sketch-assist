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
  &:active {
    transform: translateY(2px) rotate(1deg);
  }
`;

const Content = () => {
  const coolButtonAction = ev => {
    ev.preventDefault();
    console.log('Nice.');
  };

  return (
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
      <ButtonPrimary onClick={ev => coolButtonAction(ev)}>Create</ButtonPrimary>
    </Main>
  );
};

export default Content;
