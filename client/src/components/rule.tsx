import { RuleDTO } from '../utils/definitions.dto';
import styled from 'styled-components';
import { getColor } from '../utils/colors';

const RuleContainer = styled.div`
  padding: 8px 12px;
  line-height: 24px;
  max-width: 272px;
  &:hover {
    background-color: ${getColor('primary', 5)};
  }
  &:active {
    background-color: ${getColor('primary', 20)};
  }
`;

export const Rule = ({ rule }: { rule: RuleDTO }) => {
  return (
    <a href="#">
      <RuleContainer>
        {rule.name}
        <button>?</button>
      </RuleContainer>
    </a>
  );
};
