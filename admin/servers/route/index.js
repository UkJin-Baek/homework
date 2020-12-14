const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({username:'국잔'}));

module.exports = router;