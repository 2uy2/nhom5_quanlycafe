import { initialMenuItems, MENU_STORAGE_KEY } from "../data/menuSeed";

function readMenuItems() {
  const storedItems = localStorage.getItem(MENU_STORAGE_KEY);

  if (!storedItems) {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(initialMenuItems));
    return initialMenuItems;
  }

  try {
    return JSON.parse(storedItems);
  } catch {
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(initialMenuItems));
    return initialMenuItems;
  }
}

function persistMenuItems(items) {
  localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(items));
}

const wait = (payload) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(payload), 260);
  });

export const menuStore = {
  async getMenuItems() {
    return wait(readMenuItems());
  },

  async createMenuItem(payload) {
    const items = readMenuItems();
    const newItem = {
      ...payload,
      id: `MN-${String(Date.now()).slice(-5)}`,
      price: Number(payload.price),
      updatedAt: new Date().toISOString(),
    };
    const nextItems = [newItem, ...items];
    persistMenuItems(nextItems);
    return wait(newItem);
  },

  async updateMenuItem(id, payload) {
    const items = readMenuItems();
    const updatedItem = {
      ...payload,
      id,
      price: Number(payload.price),
      updatedAt: new Date().toISOString(),
    };
    const nextItems = items.map((item) => (item.id === id ? updatedItem : item));
    persistMenuItems(nextItems);
    return wait(updatedItem);
  },

  async deleteMenuItem(id) {
    const items = readMenuItems();
    persistMenuItems(items.filter((item) => item.id !== id));
    return wait({ id });
  },
};
