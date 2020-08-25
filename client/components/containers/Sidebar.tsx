import { useContext } from 'react';
import styled from 'styled-components';
import { CoreAssistantContext } from '../../pages';
import { getColor } from '../../utils/colors';
import { CoreAssistantDTO } from '../../utils/definitions.dto';
import Rule from '../Rule';

const SearchInput = styled.input`
  border: none;
  padding: 0px 8px 0px 40px;
  line-height: 40px;
  margin-bottom: 8px;
  width: 100%;
  max-width: 272px;
  background-image: url('./icons/search.svg');
  background-repeat: no-repeat;
  background-position: 8px;
  ::placeholder {
    color: ${getColor('primary', 40)};
  }
`;

const Aside = styled.aside`
  background-color: ${getColor('primary', 5)};
  display: block;
  padding: 8px;
  overflow: hidden;
  height: 100%;
`;

const RulesContainer = styled.div`
  height: calc(100vh - 224px);
  overflow: auto;
`;

const Logo = styled.img`
  margin: 40px auto;
  display: block;
  height: 80px;
`;

const Sidebar = () => {
  const assistants: CoreAssistantDTO[] = useContext(CoreAssistantContext);

  return (
    <Aside>
      <Logo src="./logo.svg" alt="logo" />
      <SearchInput
        type="search"
        name="search-rules"
        id="search-rules"
        placeholder="Search for a rule..."
      />
      <RulesContainer>
        {assistants.map(a => (
          <div key={a.packageName}>
            {a.rules.map(rule => (
              <Rule rule={rule} key={rule.name} />
            ))}
          </div>
        ))}
      </RulesContainer>
    </Aside>
  );
};

export default Sidebar;
