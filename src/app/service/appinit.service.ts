import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Config {
  api_server: string;
}

@Injectable({
  providedIn: 'root',
})
export class AppInitService {
  baseUrl: string;

  constructor(private readonly http: HttpClient) {
    this.load();
  }
  load(): Promise<void> {
    return this.http
      .get<Config>('assets/config/config.json')
      .toPromise()
      .then((config) => {
        this.baseUrl = config.api_server;
      });
  }
}

export function initConfig(config: AppInitService): () => Promise<void> {
  return () => config.load();
}
