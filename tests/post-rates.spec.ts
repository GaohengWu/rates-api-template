import {expect, test} from '@playwright/test';
import {Currency} from "./currency";
import {StatusCodes} from "http-status-codes";

test.describe('POST /api/rates', () => {
  test('creates new currency and returns 201', async ({request}) => {
    const response = await request.post(`/api/rates`, {data: {"currency": "VND", "rate": 0.95} });

    expect(response.status()).toBe(201);
    const responseDelete = await request.delete(`/api/rates/VND`);
    expect(responseDelete.status()).toBe(204);
  });

  test('returns 400 for invalid currency code', async ({request}) => {
    const response = await request.post(`/api/rates`, {data: {"currency": "vn", "rate": 0.95} });

    expect(response.status()).toBe(400);
  });

  test('returns 400 for rate equal to 0', async ({request}) => {
    const response = await request.post(`/api/rates`, {data: {"currency": "CNY", "rate": 0} });

    expect(response.status()).toBe(400);
  });

  test('returns 400 for rate greater than 1000000', async ({request}) => {
    const response = await request.post(`/api/rates`, {data: {"currency": "CNY", "rate": 1000001} });

    expect(response.status()).toBe(400);
  });

  test('returns 400 for non-numeric rate', async ({request}) => {
    const response = await request.post(`/api/rates`, {data: {"currency": "CNY", "rate": '1.3'} });

    expect(response.status()).toBe(400);
  });

  test('returns 400 for invalid JSON', async ({request}) => {
    const response = await request.post(`/api/rates`, {data: {"currency": "CNY"} });

    expect(response.status()).toBe(400);
  });

  test('returns 409 when currency already exists', async ({request}) => {
    const response = await request.post(`/api/rates`, {data: {"currency": "USD", "rate": 1.2} });

    expect(response.status()).toBe(409);
  });
  test.skip('returns 413 for body larger than 10000 bytes', async ({request}) => {});
  //Currently not easy to test this
});
