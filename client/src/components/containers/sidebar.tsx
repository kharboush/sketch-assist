import { useContext } from 'react';
import { CoreAssistantContext } from '../../../pages';
import { CoreAssistantDTO } from '../../utils/definitions.dto';
import { Rule } from '../rule';
import { getColor } from '../../utils/colors';
import styled from 'styled-components';

const Header = styled.header`
  margin: 40px auto;
`;

const Input = styled.input`
  border: none;
  height: 40px;
  padding: 12px;
  font-size: 16px;
  margin-bottom: 8px;
  width: 100%;
`;

const Sidebar = () => {
  const assistants: CoreAssistantDTO[] = useContext(CoreAssistantContext);

  return (
    <aside
      style={{
        width: 'auto',
        height: '100vh',
        overflow: 'auto',
        backgroundColor: getColor('primary', 5),
        display: 'block',
        padding: '8px',
      }}
    >
      <Header>
        <img
          style={{ margin: 'auto', display: 'block' }}
          src="./logo.svg"
          alt="logo"
        />
      </Header>
      <div style={{ width: '100%', display: 'flex' }}>
        <Input type="search" name="" id="" placeholder="Search for a rule..." />
      </div>
      <div>
        {assistants.map(a => (
          <div key={a.packageName}>
            {a.rules.map(rule => (
              <Rule rule={rule} key={rule.name} />
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
