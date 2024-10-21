const { findById } = require("../model/users");

async function getProfile(req, res) {
    //#swagger.tags=["user"]
  const ID = req.user.id;
  const user = await findById(ID);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const profile = {
    name: user.displayName,
    email: user.email || user.profileUrl,
    image: user.image,
  };
  return res.send(profile);
}

module.exports = { getProfile };
