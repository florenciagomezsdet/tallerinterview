import { test, expect } from '@playwright/test';

const API = 'https://jsonplaceholder.typicode.com';

test.describe('Posts API', () => {
  test('GET /posts/1 returns a valid post', async ({ request }) => {
    const res = await request.get(`${API}/posts/1`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toEqual(
      expect.objectContaining({
        id: 1,
        userId: expect.any(Number),
        title: expect.any(String),
        body: expect.any(String),
      }),
    );
  });

  test('POST /posts creates a post', async ({ request }) => {
    const payload = { title: 'QA portfolio', body: 'Created by Playwright', userId: 1 };
    const res = await request.post(`${API}/posts`, { data: payload });
    expect(res.status()).toBe(201);
    const body = await res.json();
    expect(body).toMatchObject(payload);
    expect(body.id).toEqual(expect.any(Number));
  });

  test('GET /posts/99999 returns 404', async ({ request }) => {
    const res = await request.get(`${API}/posts/99999`);
    expect(res.status()).toBe(404);
  });
});
