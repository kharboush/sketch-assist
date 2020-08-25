import { RuleDTO } from '../utils/definitions.dto';
import styled from 'styled-components';
import { getColor } from '../utils/colors';

const RuleContainer = styled.a`
  padding: 8px 12px;
  line-height: 24px;
  max-width: 272px;
  display: block;
  &:hover {
    background-color: ${getColor('primary', 5)};
  }
  &:active {
    background-color: ${getColor('primary', 20)};
  }
`;

const Rule = ({ rule }: { rule: RuleDTO }) => {
  return (
    <RuleContainer href="#">
      {rule.name}
      <button>?</button>
    </RuleContainer>
  );
};

export default Rule;
