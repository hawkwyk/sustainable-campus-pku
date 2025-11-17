# 可持续校园实践网站部署指南

## 概述
本指南将帮助您将北京大学可持续校园实践网站部署到GitHub Pages，并配置GitHub Issues集成功能。

## 前提条件
1. GitHub账户
2. 基本的Git操作知识
3. 文本编辑器

## 部署步骤

### 步骤1：创建GitHub仓库

1. 登录GitHub
2. 创建新仓库，命名为 `sustainable-campus-pku`（或其他您喜欢的名称）
3. 选择公开仓库
4. 初始化仓库（添加README文件）

### 步骤2：上传网站文件

1. 将以下文件上传到您的GitHub仓库：
   ```
   /
   ├── index.html              # 主页
   ├── projects.html           # 项目页面
   ├── tour.html              # 地图页面
   ├── about.html             # 关于页面
   ├── main.js                # 主要JavaScript文件
   ├── config.js              # 配置文件
   ├── resources/             # 资源文件夹
   │   ├── logo.png          # 网站logo
   │   ├── hero-bg.jpg       # 主页背景图
   │   ├── project-*.jpg     # 项目图片
   │   └── team-member*.jpg  # 团队成员图片
   └── TECHNICAL_DOCUMENTATION.md  # 技术文档
   ```

2. 您可以通过以下方式上传：
   - 直接在GitHub网页界面上传
   - 使用Git命令行
   - 使用GitHub Desktop客户端

### 步骤3：配置GitHub Pages

1. 进入仓库的 Settings 页面
2. 找到 Pages 选项
3. 选择 Source 为 `Deploy from a branch`
4. 选择 Branch 为 `main` 和文件夹为 `/ (root)`
5. 保存设置
6. 您的网站将在几分钟内可通过 `https://[your-username].github.io/sustainable-campus-pku` 访问

### 步骤4：配置GitHub Issues集成

#### 4.1 创建Personal Access Token

1. 进入GitHub Settings > Developer settings > Personal access tokens
2. 点击 "Generate new token"
3. 设置Token名称，如 "Sustainable Campus Website"
4. 选择权限：
   - `repo`（完整仓库控制，包括私有仓库）
   - 或 `public_repo`（仅限公开仓库）
5. 生成并保存Token（只会显示一次）

#### 4.2 更新配置文件

编辑 `config.js` 文件，更新GitHub配置部分：

```javascript
github: {
    enabled: true,
    owner: 'your-github-username',  // 替换为您的GitHub用户名
    repo: 'sustainable-campus-pku',   // 您的仓库名称
    token: 'your-github-token',       // 您的Personal Access Token
    labels: ['新标记', '待审核'],
    autoPublish: false
}
```

#### 4.3 设置环境变量（推荐）

为了安全起见，建议将Token设置为环境变量：

1. 在GitHub仓库的 Settings > Secrets 中
2. 添加新Secret：
   - Name: `GITHUB_TOKEN`
   - Value: 您的Personal Access Token

### 步骤5：创建后端API（可选）

如果您需要更安全的Token管理，可以创建Vercel函数：

1. 创建 `api/add-marker.js` 文件
2. 使用Vercel部署后端服务
3. 在 `config.js` 中更新API端点

### 步骤6：测试功能

1. 访问您的网站
2. 点击"校园地图"页面
3. 尝试添加新标记
4. 检查GitHub Issues是否收到新的Issue

## 自定义配置

### 修改网站内容

所有可配置内容都在 `config.js` 文件中：

- **网站基本信息**：标题、描述、关键词等
- **联系信息**：邮箱、电话、地址等
- **项目数据**：项目详情、图片链接等
- **团队成员**：成员信息、头像等
- **地图配置**：中心坐标、默认标记等

### 更换图片资源

将您的图片文件放入 `resources/` 文件夹，并更新 `config.js` 中的对应路径。

### 修改样式

网站使用Tailwind CSS，您可以在HTML文件的 `<style>` 部分修改自定义样式。

## 常见问题

### Q: 网站无法访问
A: 检查GitHub Pages设置，确保选择了正确的分支和文件夹。

### Q: GitHub Issues集成不工作
A: 检查以下几点：
- Personal Access Token是否正确
- Token权限是否足够
- 仓库是否公开
- config.js配置是否正确

### Q: 图片不显示
A: 检查：
- 图片文件是否已上传到resources文件夹
- 文件路径是否正确
- 文件名大小写是否匹配

### Q: 地图无法加载
A: 检查：
- 高德地图API Key是否正确
- 网络连接是否正常
- 浏览器是否支持JavaScript

## 高级配置

### 自定义域名

1. 在GitHub Pages设置中添加自定义域名
2. 配置DNS解析
3. 等待DNS生效

### 启用HTTPS

GitHub Pages自动支持HTTPS，无需额外配置。

### 添加分析工具

可以在HTML文件的 `<head>` 部分添加Google Analytics等分析工具代码。

## 维护建议

1. **定期更新**：保持内容新鲜，定期添加新项目
2. **安全检查**：定期更新Personal Access Token
3. **性能优化**：压缩图片，优化代码
4. **用户反馈**：关注GitHub Issues中的用户反馈

## 技术支持

如有问题，请：
1. 检查浏览器控制台错误信息
2. 查看GitHub Issues是否有相关问题
3. 联系项目维护者

## 相关链接

- [GitHub Pages文档](https://docs.github.com/en/pages)
- [GitHub Issues API](https://docs.github.com/en/rest/issues)
- [高德地图API](https://lbs.amap.com/api)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

*最后更新：2025年1月*