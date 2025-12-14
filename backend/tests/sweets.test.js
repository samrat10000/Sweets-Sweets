import { jest } from '@jest/globals';
import 'dotenv/config';

jest.unstable_mockModule('mongoose', () => ({
  default: {
    connect: jest.fn().mockResolvedValue(true),
    connection: { close: jest.fn() },
    Schema: class {
      static Types = { ObjectId: class {} };
    },
    Types: { ObjectId: class {} },
    model: jest.fn().mockReturnValue({
      find: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
      findById: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    }),
  },
}));

jest.unstable_mockModule('../models/Sweet.js', () => ({
  default: {
    find: jest.fn().mockResolvedValue([]),
  }
}));

const { default: app } = await import('../server.js');
const { default: request } = await import('supertest');

// Mock other dependencies
jest.unstable_mockModule('cloudinary', () => ({
  default: { v2: { config: jest.fn() } }
}));
jest.unstable_mockModule('multer-storage-cloudinary', () => ({
  CloudinaryStorage: class {} 
}));
jest.unstable_mockModule('multer', () => ({
  default: () => ({ single: jest.fn() })
}));


describe("Sweets Endpoints", () => {
  test("GET /api/sweets - should return all sweets", async () => {
    const res = await request(app).get("/api/sweets");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
