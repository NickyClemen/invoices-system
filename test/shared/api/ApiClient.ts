import * as request from 'supertest';

import { TestClient } from './TestClient';

export type SuperTestRequest = request.SuperTest<request.Test>;

export class ApiClient {
  private client: TestClient;
  protected superTestRequest: SuperTestRequest;

  constructor(client: TestClient) {
    this.client = client;
    this.superTestRequest = request(
      this.client.serverApplication.getHttpServer(),
    );
  }
}
