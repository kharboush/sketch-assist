import Head from 'next/head';
import React from 'react';
import Main from '../src/components/containers/main';
import Sidebar from '../src/components/containers/sidebar';
import { CoreAssistantDTO } from '../src/utils/definitions.dto';
import GlobalStyle from '../src/styles/globalStyles';
import { getAllRulesData as getAllAssistantData } from '../src/utils/requests';

export const getStaticProps = async () => {
  const allAssistantData = await getAllAssistantData();
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
          <Main />
        </div>
      </CoreAssistantContext.Provider>
    </>
  );
}
