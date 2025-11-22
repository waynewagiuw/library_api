const memberModel = require("../models/member");
const validator = require("validator");

const createMember = async ({ name, email, phone, address }) => {
  if (!name || !email || !phone || !address) {
    const err = new Error("All fields are required");
    err.statusCode = 400;
    throw err;
  }

  if (!validator.isEmail(email)) {
    const err = new Error("Invalid email format");
    err.statusCode = 400;
    throw err;
  }

  const phoneRegex = /^[\d+\-\s]+$/;
  if (!phoneRegex.test(phone)) {
    const err = new Error("Invalid phone format");
    err.statusCode = 400;
    throw err;
  }

  const existing = await memberModel.findMemberByEmail(email);
  if (existing) {
    const err = new Error("Email already exists");
    err.statusCode = 409;
    throw err;
  }

  return memberModel.createMember({ name, email, phone, address });
};

const getMemberById = async (id) => {
  const member = await memberModel.findMemberById(id);
  if (!member) {
    const err = new Error("Member not found");
    err.statusCode = 404;
    throw err;
  }
  return member;
};

module.exports = {
  createMember,
  getMemberById,
};
