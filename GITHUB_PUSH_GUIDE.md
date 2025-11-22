# GitHub Push 完整指南 🚀

## 方法 1: 使用 HTTPS + Personal Access Token（推荐）

这是最简单的方法，不需要配置 SSH 密钥。

### 步骤 1: 创建 Personal Access Token

1. **打开 GitHub Token 设置页面**
   
   访问: https://github.com/settings/tokens
   
   或者手动导航:
   - 点击右上角头像
   - Settings
   - Developer settings (左侧最底部)
   - Personal access tokens
   - Tokens (classic)

2. **生成新 Token**
   
   点击 **"Generate new token"** → **"Generate new token (classic)"**

3. **配置 Token**
   
   - **Note**: 填写 `PanelVerse Development`
   - **Expiration**: 选择 `90 days` 或 `No expiration`（推荐 90 天）
   - **Select scopes**: 勾选以下权限
     - ✅ `repo` (完整的仓库权限)
     - ✅ `workflow` (如果需要 GitHub Actions)

4. **生成并复制 Token**
   
   - 点击底部的 **"Generate token"**
   - ⚠️ **重要**: 立即复制 token！关闭页面后无法再查看
   - Token 格式类似: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 步骤 2: 配置 Git Remote

在终端中运行：

```bash
cd /Users/kezheng/code/panelverse

# 切换到 HTTPS
git remote set-url origin https://github.com/bryanzk/PanelVerse.git

# 验证
git remote -v
```

应该显示：
```
origin  https://github.com/bryanzk/PanelVerse.git (fetch)
origin  https://github.com/bryanzk/PanelVerse.git (push)
```

### 步骤 3: Push 代码

```bash
git push -u origin main
```

**首次 Push 时会提示：**
- Username: 输入您的 GitHub 用户名 `bryanzk`
- Password: **粘贴刚才复制的 Personal Access Token**（不是 GitHub 密码！）

### 步骤 4: 保存凭据（可选但推荐）

避免每次都输入 token：

```bash
# macOS 使用 Keychain 保存
git config --global credential.helper osxkeychain
```

下次 push 时会自动使用保存的 token。

---

## 方法 2: 使用 SSH Key（适合长期开发）

如果您经常使用 Git，SSH 是更好的选择。

### 步骤 1: 生成 SSH 密钥

```bash
# 生成新的 SSH 密钥（用您的 GitHub 邮箱）
ssh-keygen -t ed25519 -C "your_email@example.com"

# 提示输入文件位置，直接按回车（使用默认）
# 提示输入密码，可以留空或设置密码
```

### 步骤 2: 添加到 ssh-agent

```bash
# 启动 ssh-agent
eval "$(ssh-agent -s)"

# 添加私钥
ssh-add ~/.ssh/id_ed25519
```

### 步骤 3: 添加公钥到 GitHub

```bash
# 复制公钥到剪贴板
cat ~/.ssh/id_ed25519.pub | pbcopy
```

然后：
1. 访问: https://github.com/settings/keys
2. 点击 **"New SSH key"**
3. Title: 填写 `Mac - PanelVerse`
4. Key: 粘贴公钥（已在剪贴板）
5. 点击 **"Add SSH key"**

### 步骤 4: 测试连接

```bash
ssh -T git@github.com
```

成功会显示：
```
Hi bryanzk! You've successfully authenticated...
```

### 步骤 5: Push 代码

```bash
cd /Users/kezheng/code/panelverse

# SSH remote 已经配置好了，直接 push
git push -u origin main
```

---

## 快速命令参考

### 查看当前 remote
```bash
git remote -v
```

### 切换 HTTPS 和 SSH
```bash
# 切换到 HTTPS
git remote set-url origin https://github.com/bryanzk/PanelVerse.git

# 切换到 SSH
git remote set-url origin git@github.com:bryanzk/PanelVerse.git
```

### 查看 Git 配置
```bash
git config --list
```

### 清除保存的凭据
```bash
git credential-osxkeychain erase
host=github.com
protocol=https
[按两次回车]
```

---

## 常见问题排查

### ❌ 问题: "Authentication failed"

**原因**: Token 错误或过期

**解决**:
1. 重新生成 Personal Access Token
2. 确保 token 有 `repo` 权限
3. 清除旧凭据后重试

### ❌ 问题: "Permission denied (publickey)"

**原因**: SSH 密钥配置问题

**解决**:
1. 检查公钥是否添加到 GitHub
2. 确认 ssh-agent 运行中
3. 测试连接: `ssh -T git@github.com`

### ❌ 问题: "fatal: remote origin already exists"

**原因**: remote 已存在

**解决**:
```bash
# 删除现有 remote
git remote remove origin

# 重新添加
git remote add origin https://github.com/bryanzk/PanelVerse.git
```

---

## 推荐流程

对于 **PanelVerse 项目**，我推荐：

1. ✅ **使用 HTTPS + Personal Access Token**
   - 配置简单
   - 5 分钟搞定
   - 适合快速开始

2. ⏰ **稍后考虑 SSH**
   - 长期使用更方便
   - 不需要每次输入密码
   - 更安全

---

## 下一步

完成上述配置后：

```bash
cd /Users/kezheng/code/panelverse

# Push 所有代码到 GitHub
git push -u origin main

# 验证
# 访问 https://github.com/bryanzk/PanelVerse
# 应该能看到所有文件！
```

🎉 **完成后您的代码就在 GitHub 上了！**

---

## 需要帮助？

如果遇到任何问题：
1. 检查 token 权限是否包含 `repo`
2. 确认用户名是 `bryanzk`
3. 确保仓库名称正确：`PanelVerse`
4. 告诉我错误信息，我会帮您解决！
