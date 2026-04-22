const Account = require("../models/Account");

const PASSWORD_PATTERN = /^\d{4}$/;
const PASSWORD_SPACE_SIZE = 10000;

const generateRandomPassword = () =>
  Math.floor(Math.random() * PASSWORD_SPACE_SIZE)
    .toString()
    .padStart(4, "0");

const createUniqueAccountPassword = async (reservedPasswords = new Set()) => {
  if (reservedPasswords.size >= PASSWORD_SPACE_SIZE) {
    throw new Error("Đã hết không gian mật khẩu 4 số khả dụng.");
  }

  let password = generateRandomPassword();

  while (
    reservedPasswords.has(password) ||
    (await Account.exists({ password }))
  ) {
    password = generateRandomPassword();
  }

  reservedPasswords.add(password);
  return password;
};

const normalizeAccountPasswords = async () => {
  const accounts = await Account.find().sort({ createdAt: 1 });
  const usedPasswords = new Set();
  const updates = [];

  for (const account of accounts) {
    const currentPassword = String(account.password || "");

    if (PASSWORD_PATTERN.test(currentPassword) && !usedPasswords.has(currentPassword)) {
      usedPasswords.add(currentPassword);
      continue;
    }

    const nextPassword = await createUniqueAccountPassword(usedPasswords);
    updates.push(
      Account.updateOne({ _id: account._id }, { password: nextPassword }),
    );
  }

  if (updates.length > 0) {
    await Promise.all(updates);
  }

  return updates.length;
};

module.exports = {
  createUniqueAccountPassword,
  normalizeAccountPasswords,
  PASSWORD_PATTERN,
};
