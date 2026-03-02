const express = require('express');
const router = express.Router();
const axios = require('axios');
const User = require('../models/user');
const wxConfig = require('../config/wx');
const { generateToken } = require('../utils/jwt');

// 小程序登录接口
router.post('/login', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ success: false, message: '缺少code参数' });
    }

    // 调用微信接口换取openid和session_key
    const wxResponse = await axios.get(wxConfig.loginUrl, {
      params: {
        appid: wxConfig.appid,
        secret: wxConfig.appsecret,
        js_code: code,
        grant_type: 'authorization_code'
      }
    });

    const { openid, session_key, unionid } = wxResponse.data;

    if (!openid) {
      return res.status(400).json({ success: false, message: '微信登录失败', error: wxResponse.data });
    }

    // 查询或创建用户
    let user = await User.findOne({ where: { openid } });
    
    if (!user) {
      user = await User.create({
        openid,
        unionid: unionid || null
      });
    } else if (unionid && !user.unionid) {
      // 更新unionid
      user.unionid = unionid;
      await user.save();
    }

    // 生成JWT令牌
    const token = generateToken({ userId: user.id, openid });

    res.json({
      success: true,
      message: '登录成功',
      data: {
        token,
        user: {
          id: user.id,
          nickname: user.nickname,
          avatar: user.avatar
        }
      }
    });
  } catch (error) {
    console.error('登录失败:', error);
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

// 更新用户信息接口
router.post('/updateUserInfo', async (req, res) => {
  try {
    const { userId, userInfo } = req.body;
    
    if (!userId || !userInfo) {
      return res.status(400).json({ success: false, message: '缺少必要参数' });
    }

    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: '用户不存在' });
    }

    // 更新用户信息
    await user.update({
      nickname: userInfo.nickName,
      avatar: userInfo.avatarUrl,
      gender: userInfo.gender
    });

    res.json({
      success: true,
      message: '用户信息更新成功',
      data: {
        user: {
          id: user.id,
          nickname: user.nickname,
          avatar: user.avatar,
          gender: user.gender
        }
      }
    });
  } catch (error) {
    console.error('更新用户信息失败:', error);
    res.status(500).json({ success: false, message: '服务器错误', error: error.message });
  }
});

module.exports = router;