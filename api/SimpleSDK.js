import API from './api'; // Adjust the path as needed
import {makeAPICall} from './apicalls';

class SimpleSDK {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.apiBaseUrl = 'https://server.panoplia.io';
    this.api = new API({
      hostUrl: this.apiBaseUrl,
      api_key: this.apiKey,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  async calltheapi() {
    const data = await makeAPICall(this.api, this.apiKey);
    return data;
  }
}

export default SimpleSDK;
