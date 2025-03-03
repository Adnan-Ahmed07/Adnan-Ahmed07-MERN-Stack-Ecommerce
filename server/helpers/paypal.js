const axios = require("axios");

const PAYPAL_CLIENT_ID = "Afv76t1dghmLikey4BzL4_2ORLtFbjGKJvDnXTyTRRDklUNb5_Nml_93xO-wPnaWJSlzHKH7JG6371U-";
const PAYPAL_CLIENT_SECRET = "EPXI54a4M5wmOjRL0qnoIWdsiJTX4GUs33ROeupzG4o-zU6th-Y14cb60cCyWtjocmAFd1tgkVTiGAvX";
const PAYPAL_API_BASE = "https://api.sandbox.paypal.com"; // Use "https://api.paypal.com" for production

// Get PayPal OAuth 2.0 access token
const getAccessToken = async () => {
  try {
    const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`).toString("base64");
    const response = await axios.post(
      `${PAYPAL_API_BASE}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error getting PayPal access token:", error.response?.data || error.message);
    throw error;
  }
};

// Create a PayPal order
const createPayPalOrder = async (orderData) => {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.post(
      `${PAYPAL_API_BASE}/v2/checkout/orders`,
      orderData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating PayPal order:", error.response?.data || error.message);
    throw error;
  }
};

module.exports = {
  getAccessToken,
  createPayPalOrder,
};