module.exports = {
  handleId: (req, res) => {
    let id = req.params.id;
    if (!id) {
      res.status(404).json({ message: "Resource tidak tersedia!" });
    } else {
      return id;
    }
  },
};
