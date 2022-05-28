import { rest, RequestHandler, setupWorker, SetupWorkerApi } from 'msw';

import { environment } from '@chapp/shared-config';
const API_URL = `${environment.API_BASEURL}api`;

export const handlers: RequestHandler[] = [
  rest.post(`${API_URL}/room/undefined/message`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.delay(1500),
      ctx.json({ data: ['asd', 'asda'] })
    );
  }),
];

// this configures a browser service work with our mocked request handlers
export const worker: SetupWorkerApi = setupWorker(...handlers);
