import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CoreAssistantDTO, RuleDTO } from '../statics/definitions.dto';

const API = 'https://sketchassistant.herokuapp.com/assistants';

const generateRuleOptions = (rule: RuleDTO) => {
  return Object.keys(rule.config).map(option => {
    if (option !== 'active') {
      if (
        typeof rule.config[option] === 'number' ||
        typeof rule.config[option] === 'string'
      ) {
        return (
          <div>
            <label htmlFor={option}>{option}</label>
            <input
              type="text"
              name={option}
              id={option}
              value={rule.config[option]}
            />
          </div>
        );
      }
    }
    return '';
  });
};

const Rule = ({ rule }: { rule: RuleDTO }) => {
  return (
    <div>
      <input type="checkbox" name={rule.name} id={rule.name} />
      <label htmlFor={rule.name}>{rule.name}</label>
      {generateRuleOptions(rule)}
    </div>
  );
};

const App = () => {
  const [assistants, setAssistants] = useState<CoreAssistantDTO[]>([]);

  useEffect(() => {
    (async () => {
      const result = await axios.get(API);
      setAssistants(result.data);
    })();
  }, []);

  return (
    <>
      <div>
        {assistants.map((ast: CoreAssistantDTO) => {
          return (
            <>
              <h1 key={ast.packageName}>{ast.packageName}</h1>
              {ast.rules.map(rule => {
                return (
                  <>
                    <Rule rule={rule} key={rule.name} />
                    <a
                      href={`https://github.com/sketch-hq/sketch-assistants/blob/main/assistants/core/src/rules/${rule.name}`}
                    >
                      Go to definition
                    </a>
                    <br />
                    <br />
                  </>
                );
              })}
            </>
          );
        })}
      </div>
      <button>Generate Assistant</button>
    </>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
