import { jest } from '@jest/globals';
import 'dotenv/config';

// Set env vars
process.env.JWT_SECRET = 'test_secret';

// Mock mongoose
jest.unstable_mockModule('mongoose', () => ({
  default: {
    connect: jest.fn().mockResolvedValue(true),
    connection: {
      close: jest.fn().mockResolvedValue(true),
    },
    Schema: class {
      static Types = { ObjectId: class {} };
    },
    Types: { ObjectId: class {} },
    model: jest.fn().mockReturnValue({
      find: jest.fn().mockResolvedValue([]),
      findOne: jest.fn().mockResolvedValue(null),
      findById: jest.fn().mockResolvedValue(null),
      create: jest.fn(),
    }),
  },
}));

// Mock User model
const mockUser = {
  _id: '12345',
  name: 'Test User',
  email: 'test@example.com',
  password: 'hashedpassword',
  role: 'customer'
};

jest.unstable_mockModule('../models/User.js', () => ({
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
  }
}));

// Mock bcryptjs
jest.unstable_mockModule('bcryptjs', () => ({
  default: {
    hash: jest.fn().mockResolvedValue('hashedpassword'),
    compare: jest.fn().mockResolvedValue(true),
  }
}));

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

// Import modules AFTER mocks (including bcrypt)
const { default: app } = await import('../server.js');
const { default: request } = await import('supertest');
const { default: User } = await import('../models/User.js');
const { default: bcrypt } = await import('bcryptjs');

describe("Auth Endpoints", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("POST /api/auth/register - should register a new user", async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(mockUser);

    const res = await request(app).post("/api/auth/register").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      role: "customer"
    });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("userId");
  });

  test("POST /api/auth/login - should login the user", async () => {
    User.findOne.mockResolvedValue(mockUser);
    
    const res = await request(app).post("/api/auth/login").send({
      email: "test@example.com",
      password: "password123",
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });
});
