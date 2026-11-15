export class ApiServiceCore {
  private endpoint = process.env.NEXT_PUBLIC_DEV_ENDPOINT;
  private headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    headers?: Record<string, string>,
    isFile?: boolean,
  ): Promise<T> {
    const response = await fetch(`http://${this.endpoint}/${path}`, {
      method,
      headers: isFile ? headers : { ...this.headers, ...headers },
      body: body
        ? isFile
          ? (body as FormData)
          : JSON.stringify(body)
        : undefined,
      credentials: "include",
      mode: "cors",
    });

    if (!response.ok) {
      throw new Error(
        `Request failed: ${response.status} ${response.statusText}`,
      );
    }

    return response.json();
  }

  _get<T>(path: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>("GET", path, undefined, headers);
  }

  _post<T>(
    path: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>("POST", path, body, headers);
  }

  _postFile<T>(
    path: string,
    body: FormData,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>("POST", path, body, headers, true);
  }

  _put<T>(
    path: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>("PUT", path, body, headers);
  }

  _patch<T>(
    path: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<T> {
    return this.request<T>("PATCH", path, body, headers);
  }

  _delete<T>(path: string, headers?: Record<string, string>): Promise<T> {
    return this.request<T>("DELETE", path, undefined, headers);
  }
}
