import {expect, test} from '@playwright/test';

test.describe('PATCH /api/rates/{currency}', () => {
  test('updates rate of existing currency', async ({request}) => {
    const response = await request.patch(`/api/rates/USD`, {data: {"rate": 1.52} });

    expect(response.status()).toBe(200);
  });
  test('returns 400 for invalid rate', async ({request}) => {
    const response = await request.patch(`/api/rates/USD`, {data: {"rate": 0} });

    expect(response.status()).toBe(400);
  });
  test('returns 400 for invalid currency code', async ({request}) => {
    const response = await request.patch(`/api/rates/usd`, {data: {"rate": 1.52} });

    expect(response.status()).toBe(400);
  });
  test('returns 404 for unknown currency', async ({request}) => {
    const response = await request.patch(`/api/rates/XYZ`, {data: {"rate": 1.52} });

    expect(response.status()).toBe(404);
  });
});
