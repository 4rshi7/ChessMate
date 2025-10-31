"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const createUser = async (req, res) => {
    const { authUserId, username } = req.body;
    console.log("mock drill");
    return res.status(201).json({ message: 'User created successfully' });
};
exports.createUser = createUser;
//# sourceMappingURL=userControllers.js.map