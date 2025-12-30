if (process.env.NODE_ENV !== 'test') {
  process.env.NODE_ENV = 'test';
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.clearAllMocks();
});
