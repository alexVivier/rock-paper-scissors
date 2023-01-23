export const mockRepository = function(mockModel, element, elements) {
  return {
    new: jest.fn().mockResolvedValue(mockModel()),
    constructor: jest.fn().mockResolvedValue(mockModel()),
    find: jest.fn(() => elements),
    findOne: jest.fn(() => element),
    update: jest.fn(() => element),
    create: jest.fn(() => element),
    remove: jest.fn(),
    exec: jest.fn()
  }
}