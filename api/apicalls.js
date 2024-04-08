
 export const makeAPICall = async (apiInstance, sessionId, customerId, startTime, endTime) => {
    const params = { url: "api/analytics/session/capture" };
    try {
      // Example POST request
      const postData = {
        session_id: sessionId,
        customer_id: customerId,
        start_time: startTime,
        end_time: endTime
      };
      const postResponse = await apiInstance.post(params.url, postData);
      console.log('POST API response:', postResponse);

      return { postResponse };
    } catch (error) {
      console.error('Error making API call:', error);
      throw error;
    }
  };
  