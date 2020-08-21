import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

const API = "https://sketchassistant.herokuapp.com";

const generateRuleOptions = (rule) => {
  return Object.keys(rule.config).map((option) => {
    if (option !== "active") {
      if (
        typeof rule.config[option] === "number" ||
        typeof rule.config[option] === "string"
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
    return "";
  });
};

const Rule = ({ rule }) => {
  return (
    <div>
      <input type="checkbox" name={rule.name} id={rule.name} />
      <label htmlFor={rule.name}>{rule.name}</label>
      {generateRuleOptions(rule)}
    </div>
  );
};

const App = () => {
  const [assistants, setAssistants] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await axios.get(API);
      setAssistants(result.data);
    })();
  }, []);

  return (
    <>
      <div>
        {assistants.map((ast) => {
          return (
            <>
              <h1 key={ast.assistant}>{ast.assistant}</h1>
              {ast.rules.map((rule) => {
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

ReactDOM.render(<App />, document.querySelector("#root"));
