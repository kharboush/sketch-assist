import { useContext } from 'react';
import styled from 'styled-components';
import { CoreAssistantContext } from '../../pages';
import { getColor } from '../../utils/colors';
import { CoreAssistantDTO } from '../../utils/definitions.dto';
import Rule from '../Rule';

const Header = styled.header`
  margin: 40px auto;
`;

const SearchInput = styled.input`
  border: none;
  padding: 0px 8px 0px 40px;
  line-height: 40px;
  margin-bottom: 8px;
  width: 100%;
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
  height: calc(100vh - 208px);
  overflow: auto;
`;

const Logo = styled.img`
  margin: auto;
  display: block;
`;

const Sidebar = () => {
  const assistants: CoreAssistantDTO[] = useContext(CoreAssistantContext);

  return (
    <Aside>
      <Header>
        <Logo src="./logo.svg" alt="logo" />
      </Header>
      <div style={{ width: '100%', display: 'flex' }}>
        <SearchInput
          type="search"
          name=""
          id=""
          placeholder="Search for a rule..."
        />
      </div>
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
