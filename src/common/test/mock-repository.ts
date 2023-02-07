
export let element = null;
export let elements = [null];

export function setElement(val) {
  element = val;
}

export function setElements(val) {
  elements = val;
}

export const mockRepository = function(mockModel) {
  return {
    new: jest.fn().mockResolvedValue(mockModel()),
    constructor: jest.fn().mockResolvedValue(mockModel()),
    find: jest.fn(() => elements),
    findOne: jest.fn(() => element),
    findById: jest.fn(() => element),
    update: jest.fn(() => element),
    updateOne: jest.fn(() => element),
    create: jest.fn(() => element),
    remove: jest.fn(),
    exec: jest.fn(),
    bulkSave: jest.fn(() => elements)
  }
}