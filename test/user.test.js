const { User } = require("../models/user");

test("Userのコンストラクタ", () => {
  const user = new User({ id: 1, userId: "user1", displayName: "USER1", password: "password" });
  expect(user).toBeInstanceOf(User);
  expect(user.id).toBe(1);
  expect(user.userId).toBe("user1");
  expect(user.displayName).toBe("USER1");
  expect(user.password).toBe("password");
});