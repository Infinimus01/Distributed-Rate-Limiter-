const requestCounts = {};

const rateLimiter = (limit, windowMs) => {
  return (req, res, next) => {
    const userKey = req.ip;
    const currentTime = Date.now();

    if (!requestCounts[userKey]) {
      requestCounts[userKey] = { count: 1, startTime: currentTime };
    } else {
      const timePassed = currentTime - requestCounts[userKey].startTime;
      if (timePassed < windowMs) {
        requestCounts[userKey].count++;
      } else {
        requestCounts[userKey].count = 1;
        requestCounts[userKey].startTime = currentTime;
      }
    }

    if (requestCounts[userKey].count > limit) {
      return res.status(429).json({
        message: "Too Many Requests — Rate limit exceeded",
      });
    }
    next();
  };
};

module.exports = rateLimiter;
