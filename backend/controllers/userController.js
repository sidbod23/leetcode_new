const User = require('../models/db');

const getTopPerformers = async (req, res) => {
  try {
    const { sortBy = "totalSolved", class: cls, div } = req.query;

    const filter = {};
    if (cls) filter.class = cls;
    if (div) filter.div = parseInt(div, 10);

    const sortField = sortBy === "thisWeek" ? "thisWeek" : "totalSolved";

    const users = await User.find(filter).sort({ [sortField]: -1 }).limit(10);
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { getTopPerformers };
