import axios from 'axios';
import { CoreAssistantDTO } from './definitions.dto';

export const API =
  'https://sketch-assistant-generator.herokuapp.com/assistants';

export const getAllRulesData = async (): Promise<CoreAssistantDTO[]> => {
  const response = await axios.get(API);
  console.log(response.data);
  return response.data;
};
