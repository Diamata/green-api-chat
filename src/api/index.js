import React from 'react';
import axios from "axios";

const greenApiInstance = axios.create({
  baseURL: "https://api.green-api.com/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  }
});

// Logging in to the app
export const toLogin = async (idInstance, apiTokenInstance) => {
  try {
    const { data } = await greenApiInstance.get(`/waInstance${idInstance}/getSettings/${apiTokenInstance}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Set the necessary settings to the User's account
export const setUserSettings = async (idInstance, apiTokenInstance, settings) => {
  try {
    const { data } = await greenApiInstance.post(`/waInstance${idInstance}/setSettings/${apiTokenInstance}`, settings);
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Getting the information weather the contact's number is correct or not
export const getContactNumber = async (idInstance, apiTokenInstance, chatId) => {
  try {
    const number = {chatId}
    const { data } = await greenApiInstance.post(`/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`, number);
    return data;
  } catch (error) {
    console.log(error);
  }
}

//Getting the information weather the contact has Whatsapp
export const getCheckWhatsapp = async (idInstance, apiTokenInstance, phoneNumber) => {
  try {
    const contactNumber = {phoneNumber}
    const { data } = await greenApiInstance.post(`/waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`, contactNumber);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Get all messages from a particular chat
export const getAllMessages = async ( idInstance, apiTokenInstance, chatId, count ) => {
  try {
    const dialog = {chatId, count};
    const { data } = await greenApiInstance.post(`/waInstance${idInstance}/getChatHistory/${apiTokenInstance}`, dialog);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Send a message
export const sendMessage = async (idInstance, apiTokenInstance, chatId, message) => {
  try {
    const msg = { chatId, message };
    const { data } = await greenApiInstance.post(`/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, msg);
    return data;
  } catch (error) {
    console.log(error);
    alert('Could not send the message. Please, try again later!')
  }
}

// Receive a notification
export const receiveNotification = async (idInstance, apiTokenInstance) => {
  try {
    const { data } = await greenApiInstance.get(`/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

// Delete a notification
export const deleteNotification = async (idInstance, apiTokenInstance, receiptId) => {
  try {
    const { result } = await greenApiInstance.delete(`/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`);
    return result;
  } catch (error) {
    console.log(error);
  }
}

// Get one message
export const getMessage = async (idInstance, apiTokenInstance, chatId, idMessage) => {
  try {
    const msg = { chatId, idMessage };
    const { data } = await greenApiInstance.post(`/waInstance${idInstance}/getMessage/${apiTokenInstance}`, msg);
    return data;
  } catch (error) {
    console.log(error);
  }
}