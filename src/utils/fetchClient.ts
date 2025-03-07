const BASE_URL = 'http://localhost:5000';

function request<T>(url: string, method = 'GET', data: any = null): Promise<T> {
  const options: RequestInit = { method };

  if (data !== undefined && method !== 'GET' && method !== 'HEAD') {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=utf-8',
    };
  }

  return fetch(BASE_URL + url, options).then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`Failed to fetch from ${BASE_URL}`);
  });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  delete: <T>(url: string) => request<T>(url, 'DELETE'),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
};
