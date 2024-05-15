const express = require("express");
const router = express.Router();
const {verifyAuth} = require("./authentication");


router.get("/test", async function (req, res) {
  res.json({ message: "Success" });
});


// Routes; test authhentication
router.get('/testverifyauthentication', verifyAuth, function(req, res) {
    res
        .status(200)
        .json({ ok: true })
})


module.exports = router;
