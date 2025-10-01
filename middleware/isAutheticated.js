const isAutheniticated = (req, res, next) => {

  const authenticated = true; 

  if (authorization && authorization === '1234') {
    return next();
  }

  return res.status(401).json({ error: 'Unauthorized' });   

};

module.exports = isAutheniticated;  