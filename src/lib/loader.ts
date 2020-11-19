import { EventMetadata } from 'src/types/event';

export interface InitialData {
  initialApiKey: string;
  initialSecretKey: string;
  initialEvents: EventMetadata[]
}

export function loadEvents(): EventMetadata[] {
  const events: EventMetadata[] = [];
  figma.currentPage.children.forEach((child) => {
    try {
      const potentialPluginData = child.getPluginData('event');
      if (potentialPluginData.length !== 0) {
        const event = JSON.parse(potentialPluginData) as EventMetadata;
        events.push(event);
      }
    } catch (err) {
      console.log('caught error loading data', err);
    }
  });

  return events;
}

export async function loadInitialData(): Promise<InitialData> {
  const initialApiKey: string = (await figma.clientStorage.getAsync('API_KEY')) as string;
  const initialSecretKey: string = (await figma.clientStorage.getAsync('SECRET_KEY')) as string;
  return {
    initialApiKey,
    initialSecretKey,
    initialEvents: loadEvents(), // TODO load and don't mock
  };
}
