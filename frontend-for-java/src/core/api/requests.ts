const getJavaAPIEndpoint = (url: string) => `${process.env.REACT_APP_JAVA_BACKEND_URL}${url}`;
const getAPIEndpoint = (url: string) => `${process.env.REACT_APP_BACKEND_URL}${url}`;

export const GET = async (url: string, isJavaService?: boolean) => {
  console.log('response', isJavaService, isJavaService ? getJavaAPIEndpoint(url) : getAPIEndpoint(url))

  try {
    const response = await fetch(isJavaService ? getJavaAPIEndpoint(url) : getAPIEndpoint(url), {
      headers: {
        'Content-Type': 'application/json',
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

export const POST = async (url: string, body = {}, isJavaService?: boolean) => {
  try {
    const response = await fetch(isJavaService ? getJavaAPIEndpoint(url) : getAPIEndpoint(url), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!isJavaService) {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const PATCH = async (url: string, body = {}, isJavaService?: boolean) => {
  try {
    const response = await fetch(isJavaService ? getJavaAPIEndpoint(url) : getAPIEndpoint(url), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!isJavaService) {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const PUT = async (url: string, body = {}, isJavaService?: boolean) => {
  try {
    const response = await fetch(isJavaService ? getJavaAPIEndpoint(url) : getAPIEndpoint(url), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!isJavaService) {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const DELETE = async (url: string, isJavaService?: boolean) => {
  try {
    const response = await fetch(isJavaService ? getJavaAPIEndpoint(url) : getAPIEndpoint(url), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!isJavaService) {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
};
