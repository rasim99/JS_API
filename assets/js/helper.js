
//get all data
export async function getAllData(url, endpoint) {
    try {
      const response = await axios.get(url + endpoint);
      console.log("STATUS CODE: ", response.status);
      return response.data; // Return the response data
    } catch (error) {
      console.error(error.message);
      throw error; // Optional: rethrow the error if you want to handle it elsewhere
    }
  }
  //get data by id
  export async function getDataById(url, endpoint, id) {
    try {
      const response = await axios.get(`${url}${endpoint}?id=${id}`);
      console.log("STATUS CODE: ", response.status);
      return response.data; // Return the response data
    } catch (error) {
      console.error(error.message);
      throw error; // Optional: rethrow the error if you want to handle it elsewhere
    }
  }
  //delete data by id
  export async function deleteDataById(url, endpoint, id) {
    try {
      const response = await axios.delete(`${url}${endpoint}/${id}`);
      console.log("STATUS CODE: ", response.status);
      return response.data; // Return the response data, if applicable
    } catch (error) {
      console.error(error.message);
      throw error; // Optional: rethrow the error if you want to handle it elsewhere
    }
  }
  
  // Update data by id
export async function updateDataById(url, endpoint, id, data) {
  try {
      const response = await axios.put(`${url}${endpoint}/${id}`, data);
      console.log("STATUS CODE: ", response.status);
      return response.data; // Return the updated data
  } catch (error) {
      console.error(error.message);
      throw error; // Optional: rethrow the error if you want to handle it elsewhere
  }
}

// Post new data
export async function postData(url, endpoint, data) {
  try {
      const response = await axios.post(`${url}${endpoint}`, data);
      console.log("STATUS CODE: ", response.status);
      return response.data; // Return the created data
  } catch (error) {
      console.error("Error details:", error.response ? error.response.data : error.message);
      throw error; // Optional: rethrow the error if you want to handle it elsewhere
  }
}