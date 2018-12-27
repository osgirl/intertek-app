exports.extractUserId = (req) => {
    // eslint-disable-next-line
    const id = req.user && req.user._id ? req.user._id : null;
    if (id == null) throw new Error('User not found in the request');
    return id;
};
