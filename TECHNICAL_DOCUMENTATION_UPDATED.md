# 可持续校园实践网站技术文档 - 更新版

## GitHub Issues 集成方案（直接前端调用）

### 概述
本方案实现了网站用户标记表单自动提交到GitHub Issues的功能，**无需后端服务**，直接从前端JavaScript调用GitHub API。

### 架构设计

#### 1. 前端直接调用
- 用户在地图上点击位置添加标记
- 填写表单（标题、类型、描述、图片等）
- 前端JavaScript直接调用GitHub API创建Issue
- 无需中间服务器或API网关

#### 2. GitHub Issues 结构
```markdown
## 新增地图标记提交

**标题:** [用户填写的标题]
**类型:** [项目类型]
**位置:** [经纬度坐标]
**提交者:** [用户姓名]
**提交时间:** [时间戳]
**联系邮箱:** [邮箱地址]

### 描述
[详细描述]

### 图片
![图片描述](Base64编码图片)

### 状态
- [ ] 待审核
- [ ] 已通过审核
- [ ] 已添加到地图
```

### 实现步骤

#### 步骤1：GitHub 配置
1. 创建GitHub Personal Access Token
   - 访问 GitHub Settings > Developer settings > Personal access tokens
   - 创建新token，权限包括：`repo`（私有仓库）或`public_repo`（公开仓库）
   - 保存token（只会显示一次）

2. 创建GitHub仓库
   - 建议在GitHub Pages仓库中创建Issues
   - 启用Issues功能

#### 步骤2：前端直接集成（推荐方案）
网站现在直接使用前端JavaScript调用GitHub API，无需后端服务：

```javascript
// 在tour.html中直接调用GitHub API
async function submitToGitHub(data) {
    try {
        const issueBody = createIssueBody(data);
        
        const response = await fetch(
            `https://api.github.com/repos/${CONFIG.github.owner}/${CONFIG.github.repo}/issues`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `token ${CONFIG.github.token}`,
                    'Content-Type': 'application/json',
                    'User-Agent': 'Sustainable-Campus-App'
                },
                body: JSON.stringify({
                    title: `[新增标记] ${data.marker.title}`,
                    body: issueBody,
                    labels: ['新标记', '待审核', data.marker.type]
                })
            }
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const result = await response.json();
        // 处理成功响应...
        
    } catch (error) {
        console.error('Error creating issue:', error);
        // 处理错误...
    }
}
```

#### 步骤2a：后端服务配置（可选方案）
如果您希望使用后端服务（需要服务器支持），可以创建API中间件：

```javascript
// api/add-marker.js
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { marker, imageBase64, filename } = req.body;
        
        // 创建Issue内容
        const issueBody = createIssueBody(marker, imageBase64, filename);
        
        // 调用GitHub API
        const response = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Content-Type': 'application/json',
                    'User-Agent': 'Sustainable-Campus-App'
                },
                body: JSON.stringify({
                    title: `[新增标记] ${marker.title}`,
                    body: issueBody,
                    labels: ['新标记', marker.type]
                })
            }
        );

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }

        const result = await response.json();
        
        res.status(200).json({
            success: true,
            issue_url: result.html_url,
            issue_number: result.number
        });

    } catch (error) {
        console.error('Error creating issue:', error);
        res.status(500).json({ error: error.message });
    }
}

function createIssueBody(marker, imageBase64, filename) {
    let body = `## 新增地图标记提交

**标题:** ${marker.title}
**类型:** ${marker.type}
**位置:** ${marker.lat}, ${marker.lng}
**提交者:** ${marker.author}
**提交时间:** ${new Date().toISOString()}

### 描述
${marker.description}

### 状态
- [ ] 待审核
- [ ] 已通过审核
- [ ] 已添加到地图
`;

    if (imageBase64) {
        body += `
### 图片
![${filename || '用户上传图片'}](${imageBase64})
`;
    }

    return body;
}
```

#### 步骤3：前端集成
在 `tour.html` 中修改表单提交逻辑：

```javascript
async function handleFormSubmit(e) {
    e.preventDefault();
    if (!currentMarkerPosition) return alert('请先点击地图选择位置');

    const formData = {
        marker: {
            lng: currentMarkerPosition[0],
            lat: currentMarkerPosition[1],
            title: document.getElementById('marker-title').value,
            type: document.getElementById('marker-type').value,
            description: document.getElementById('marker-description').value,
            author: document.getElementById('marker-author').value
        }
    };

    // 处理图片
    const fileInput = document.getElementById('marker-image');
    if (fileInput.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);
        reader.onload = async () => {
            formData.imageBase64 = reader.result;
            formData.filename = fileInput.files[0].name;
            await submitToGitHub(formData);
        };
    } else {
        await submitToGitHub(formData);
    }
}

async function submitToGitHub(data) {
    try {
        const response = await fetch('https://api.github.com/repos/your-username/your-repo/issues', {
            method: 'POST',
            headers: {
                'Authorization': 'token your-github-token',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: `[新增标记] ${data.marker.title}`,
                body: createIssueBody(data),
                labels: ['新标记', '待审核']
            })
        });

        const result = await response.json();

        if (result.html_url) {
            showNotification('标记提交成功！感谢您的贡献', 'success');
            closeMarkerModal();
            resetForm();
            
            // 显示Issue链接
            if (confirm('标记已提交到GitHub Issues，是否查看？')) {
                window.open(result.html_url, '_blank');
            }
        } else {
            showNotification('提交失败：' + result.message, 'error');
        }
    } catch (error) {
        console.error('提交错误:', error);
        showNotification('提交失败，请重试', 'error');
    }
}
```

### 配置说明

#### 更新config.js
确保您的 `config.js` 文件中的GitHub配置正确：

```javascript
github: {
    enabled: true,
    owner: 'your-github-username',  // 您的GitHub用户名
    repo: 'sustainable-campus-pku',   // 仓库名称
    token: 'your-github-token',       // Personal Access Token
    labels: ['新标记', '待审核'],
    autoPublish: false
}
```

### 安全注意事项

1. **Token安全**：
   - 使用GitHub Secrets存储敏感信息
   - 定期更换Personal Access Token
   - 限制Token权限范围

2. **CORS问题**：
   - 直接从前端调用GitHub API可能会遇到CORS问题
   - 建议使用GitHub Pages部署，这样域名一致
   - 或使用后端服务作为中间件

3. **图片处理**：
   - Base64图片大小限制在1MB以内
   - 大图建议使用CDN存储

### 故障排查

#### 常见问题

1. **"Failed to fetch"错误**：
   - 检查网络连接
   - 确认GitHub API是否可访问
   - 检查CORS设置

2. **401 Unauthorized**：
   - 检查Token是否正确
   - 确认Token权限是否足够
   - 检查Token是否过期

3. **403 Forbidden**：
   - 检查API调用频率限制
   - 确认仓库权限
   - 检查IP地址是否被限制

#### 调试方法

1. 使用浏览器开发者工具查看网络请求
2. 检查控制台错误信息
3. 验证GitHub Token权限
4. 测试API调用是否成功

### 优势对比

| 方案 | 优点 | 缺点 |
|------|------|------|
| **直接前端调用** | 无需服务器，部署简单，成本低 | 有CORS限制，Token暴露 |
| **后端服务** | 安全性高，可扩展性强 | 需要服务器，部署复杂 |

### 更新说明

本次更新主要改进：
1. **简化架构**：去除后端服务依赖
2. **直接集成**：前端直接调用GitHub API
3. **降低成本**：无需服务器费用
4. **提高可靠性**：减少中间环节

### 相关文件

- `tour.html` - 地图页面，包含表单和提交逻辑
- `config.js` - 配置文件，包含GitHub相关设置
- `TECHNICAL_DOCUMENTATION.md` - 完整技术文档

---

*更新日期：2025年1月*