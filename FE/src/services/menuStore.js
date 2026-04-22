const apiBaseUrl = "/api/menu";

function normalizeMenuItem(item) {
  return {
    id: item.id,
    name: item.name,
    price: Number(item.price),
    category: item.category,
    status: item.status,
    description: item.description || "",
    image: item.image || item.imageUrl || "",
    updatedAt: item.updatedAt || item.updated_at || new Date().toISOString(),
  };
}

function toApiPayload(payload) {
  return {
    name: payload.name,
    price: Number(payload.price),
    category: payload.category,
    status: payload.status,
    description: payload.description,
    imageUrl: payload.image,
  };
}

async function requestJson(url, options) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || "Không thể kết nối backend.");
  }

  return response.json();
}

export const menuStore = {
  async getMenuItems() {
    const items = await requestJson(apiBaseUrl);
    return items.map(normalizeMenuItem);
  },

  async createMenuItem(payload) {
    const newItem = await requestJson(apiBaseUrl, {
      method: "POST",
      body: JSON.stringify(toApiPayload(payload)),
    });
    return normalizeMenuItem(newItem);
  },

  async updateMenuItem(id, payload) {
    const updatedItem = await requestJson(`${apiBaseUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify(toApiPayload(payload)),
    });
    return normalizeMenuItem(updatedItem);
  },

  async deleteMenuItem(id) {
    return requestJson(`${apiBaseUrl}/${id}`, {
      method: "DELETE",
    });
  },
};
