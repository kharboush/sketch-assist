import styled from 'styled-components';
import { getColor } from '../utils/colors';
import { RuleDTO } from '../utils/definitions.dto';

const RuleContainer = styled.a`
  padding: 8px 8px 8px 12px;
  max-width: 272px;
  display: flex;
  &:hover {
    background-color: ${getColor('primary', 5)};
  }
  &:active {
    background-color: ${getColor('primary', 20)};
  }
`;

const QuestionButton = styled.button`
  width: 24px;
  height: 24px;
  border: none;
  position: relative;
  background-image: url('./icons/question-circle.svg');
  background-repeat: no-repeat;
`;

const RuleText = styled.span`
  line-height: 24px;
  width: calc(100% - 24px);
`;

const Rule = ({ rule }: { rule: RuleDTO }) => {
  return (
    <RuleContainer href="#">
      <RuleText>{rule.name}</RuleText>
      <QuestionButton>.</QuestionButton>
    </RuleContainer>
  );
};

export default Rule;
