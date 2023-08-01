const express = require('express');
const {
    createUser, 
    loginUserCtrl, 
    getallUser, 
    getaUser, 
    deleteaUser, 
    updatedUser, 
    unblockUser, 
    blockUser, 
    handlerRefreshToken, 
    logout,
} = require('../controller/userCtrl');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware')
const router = express.Router();
//route for register 
router.post("/register",createUser);
//route for login
router.post("/login",loginUserCtrl);
//route for get all users 
router.get('/all-users', getallUser);
//route for refresh token
router.get('/refresh', handlerRefreshToken);
//route for logout a user
router.get('/logout', logout);
//route for get one user
router.get('/:id', authMiddleware, isAdmin, getaUser);
//route for delete a user 
router.delete('/:id', deleteaUser);
//route for update a user 
router.put('/edit-user', authMiddleware, updatedUser);
//route for block a user
router.put('/block-user/:id', authMiddleware, isAdmin, blockUser);
//route for unblock a user
router.put('/unblock-user/:id', authMiddleware, isAdmin, unblockUser);


module.exports = router;
