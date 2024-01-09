import { LocalStorageItemsEnum } from '../constants/LocalStorageItemsEnum';

const getAPIEndpoint = (url: string) => `${process.env.REACT_APP_BACKEND_URL}${url}`;

export const GET = async (url: string) => {
  try {
    const token = localStorage.getItem(LocalStorageItemsEnum.AccessToken);
    const response = await fetch(getAPIEndpoint(url), {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token || ''}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const POST = async (url: string, body = {}) => {
  try {
    const token = url === '/refresh'
      ? localStorage.getItem(LocalStorageItemsEnum.RefreshToken)
      : localStorage.getItem(LocalStorageItemsEnum.AccessToken);

    const response = await fetch(getAPIEndpoint(url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token || ''}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const PATCH = async (url: string, body = {}) => {
  try {
    const token = localStorage.getItem(LocalStorageItemsEnum.AccessToken);
    const response = await fetch(getAPIEndpoint(url), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token || ''}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const DELETE = async (url: string) => {
  try {
    const token = localStorage.getItem(LocalStorageItemsEnum.AccessToken);
    const response = await fetch(getAPIEndpoint(url), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token || ''}`
      }
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
