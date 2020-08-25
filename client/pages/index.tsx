import Head from 'next/head';
import React from 'react';
import Content from '../components/containers/Content';
import Sidebar from '../components/containers/Sidebar';
import GlobalStyle from '../components/styles/globalStyles';
import { CoreAssistantDTO } from '../utils/definitions.dto';
import { getAllRulesData } from '../utils/requests';

export const getStaticProps = async () => {
  const allAssistantData = await getAllRulesData();
  return {
    props: {
      allAssistantData: allAssistantData,
    },
  };
};

export const CoreAssistantContext = React.createContext([]);
export default function Home({
  allAssistantData,
}: {
  allAssistantData: CoreAssistantDTO[];
}) {
  return (
    <>
      <Head>
        <title>Create Sketch Assistant</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Krona+One&family=Work+Sans:ital,wght@0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <CoreAssistantContext.Provider value={allAssistantData}>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <Content />
        </div>
      </CoreAssistantContext.Provider>
    </>
  );
}
