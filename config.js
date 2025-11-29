// 可持续校园实践网站配置文件
// 通过这个文件可以方便地管理网站内容，无需修改HTML代码

const CONFIG = {
    // 网站基本信息
    site: {
        title: '可持续校园实践 - 北京大学',
        description: '构建绿色校园，培养环保意识，推动可持续发展教育',
        keywords: '可持续发展, 环保教育, 绿色校园, 北京大学',
        logo: 'resources/logo.png',
        favicon: 'resources/logo.png',
        version: '2025.1.0'
    },
    
    // 导航菜单
    navigation: [
        { name: '主页', url: 'index.html', active: true },
        { name: '项目故事', url: 'projects.html', active: false },
        { name: '校园地图', url: 'tour.html', active: false },
        { name: '关于我们', url: 'about.html', active: false }
    ],
    
    // 联系信息
    contact: {
        email: '3226213313@qq.com',
        address: '北京市海淀区北京大学环境科学与工程学院',
        wechat: '可持续校园实践',
        wechatQR: 'resources/logo.png',
        github: 'https://github.com/hawkwyk/sustainable-campus-pku'
    },
    
    // GitHub Issues 集成配置
    github: {
        enabled: true, // 是否启用GitHub Issues集成
        owner: 'hawkwyk', // 替换为您的GitHub用户名
        repo: 'sustainable-campus-pku', // 仓库名称
        token: 'example', // GitHub Personal Access Token
        labels: ['新标记', '待审核'], // 默认标签
        autoPublish: false // 是否自动发布（建议设为false，手动审核）
    },
    
    // 主页配置
    homepage: {
        hero: {
            title: '北京大学',
            subtitle: '可持续校园实践',
            description: '构建绿色校园，培养环保意识，推动可持续发展教育，让每一位师生都成为可持续发展的实践者和传播者',
            backgroundImage: 'resources/hero-bg.jpg',
            buttons: [
                { text: '探索项目', url: 'projects.html', type: 'primary' },
                { text: '校园地图', url: 'tour.html', type: 'secondary' }
            ]
        },
        
        statistics: [
            { number: '12+', label: '实践项目', description: '覆盖校园各个领域' },
            { number: '200+', label: '参与学生', description: '来自不同院系专业' },
            { number: '5', label: '获奖项目', description: '校级、省级荣誉' },
            { number: '3', label: '合作伙伴', description: '企业、政府、NGO' }
        ],
        
        featuredProjects: [
            {
                id: 'weixiu',
                title: '蔚秀园改造',
                category: '生态景观',
                description: '通过生态设计和可持续景观改造，将蔚秀园打造成为一个绿色学习和休闲空间。',
                image: 'resources/project-weixiu.jpg',
                link: 'projects.html#weixiu'
            },
            {
                id: 'nongyuan',
                title: '农园食堂改造',
                category: '绿色餐饮',
                description: '推动绿色餐饮，减少食物浪费，建立可持续的校园餐饮系统。',
                image: 'resources/project-nongyuan.jpg',
                link: 'projects.html#nongyuan'
            },
            {
                id: 'bird',
                title: '防鸟撞设施改造',
                category: '生物多样性',
                description: '保护校园鸟类，通过科学设计减少鸟类与建筑物的碰撞。',
                image: 'resources/project-bird.jpg',
                link: 'projects.html#bird'
            },
            {
                id: 'enzyme',
                title: '酵素应用',
                category: '资源循环',
                description: '利用有机废料制作环保酵素，推广天然清洁用品的使用。',
                image: 'resources/project-enzyme.jpg',
                link: 'projects.html#enzyme'
            }
        ]
    },
    
    // 项目数据
    projects: [
        {
            id: 'weixiu',
            title: '蔚秀园改造',
            category: '生态景观',
            year: '2024年',
            participants: '25人',
            description: '蔚秀园改造项目是北京大学可持续校园实践课程的重要成果之一。项目团队通过生态设计和可持续景观改造，将原有的传统花园打造成为一个集学习、休闲、生态教育于一体的现代化绿色空间。',
            details: [
                '设计理念：以"人与自然和谐共生"为核心，融入生态学原理',
                '植物选择：优先选用本地原生植物，减少维护成本',
                '节水系统：安装智能滴灌系统，提高水资源利用效率',
                '材料使用：采用可再生材料和回收材料',
                '教育功能：设置生态教育标识和互动设施'
            ],
            achievements: [
                '减少用水量40%',
                '增加生物多样性30%',
                '成为校园生态教育基地',
                '获得校级优秀项目奖'
            ],
            image: 'resources/project-weixiu.jpg',
            wechatLink: 'https://mp.weixin.qq.com/s/example-weixiu',
            type: 'ecology',
            location: {
                lat: 39.995483,
                lng: 116.303903
            }
        },
        {
            id: 'nongyuan',
            title: '农园食堂改造',
            category: '绿色餐饮',
            year: '2024年',
            participants: '40人',
            description: '农园食堂改造项目致力于推动校园绿色餐饮，通过系统性的改造和管理创新，建立了可持续的校园餐饮模式。',
            details: [
                '垃圾分类：建立完善的厨余垃圾分类系统',
                '食材采购：优先选择本地有机食材',
                '餐具使用：推广可降解餐具和可重复使用餐具',
                '食物银行：建立剩余食物分享机制',
                '宣传教育：开展光盘行动和节约粮食宣传'
            ],
            achievements: [
                '减少食物浪费50%',
                '垃圾分类准确率达到95%',
                '每月节约运营成本15%',
                '成为北京市绿色食堂示范点'
            ],
            image: 'resources/project-nongyuan.jpg',
            wechatLink: 'https://mp.weixin.qq.com/s/example-nongyuan',
            type: 'waste',
            location: {
                lat: 39.9920,
                lng: 116.3120
            }
        },
        {
            id: 'bird',
            title: '防鸟撞设施改造',
            category: '生物多样性',
            year: '2025年',
            participants: '8人',
            description: '防鸟撞设施改造项目通过科学研究和工程设计，有效减少了校园内鸟类与建筑物的碰撞事件，保护了校园生物多样性。',
            details: [
                '调研分析：统计鸟类碰撞事件和原因',
                '方案设计：开发鸟类友好的建筑设计方案',
                '材料研发：测试和优化防鸟撞窗膜材料',
                '安装实施：在重点建筑物安装防护设施',
                '效果监测：持续监测防护效果'
            ],
            achievements: [
                '鸟类碰撞事件减少85%',
                '开发3种防鸟撞产品原型',
                '申请2项实用新型专利',
                '发表1篇SCI论文'
            ],
            image: 'resources/project-bird.jpg',
            wechatLink: 'https://mp.weixin.qq.com/s/example-bird',
            type: 'ecology',
            location: {
                lat: 39.9900,
                lng: 116.3090
            }
        },
        {
            id: 'enzyme',
            title: '酵素应用',
            category: '资源循环',
            year: '2025年',
            participants: '7人',
            description: '我们酵素小组以“厨余变宝，绿色循环”为方向，用废弃果皮、红糖和水自制环保酵素，并延伸出两大应用：一是搭配植物起泡剂、无患子，制成天然洗手液和洗发水；二是探索出酵素对污水的辅助净化作用。项目既实现了果皮垃圾减量，又产出了实用的天然洗护产品，还验证了酵素的环保新价值，在校内推广了可持续生活的理念。',
            details: [
                '设计理念：以“变废为宝，循环共生”为核心，融入可持续生活理念',
                '原料选择：仅使用废弃果皮、红糖和水制作环保酵素，零额外工业添加',
                '衍生产品：加入植物起泡剂，制成温和无刺激的洗手液；搭配无患子，调配出天然去屑的洗发水',
                '创新发现：验证了酵素对污水的净化作用，可辅助降低水体污染物浓度',
            ],
            achievements: [
                '实现果皮垃圾减量约50%，减少厨余垃圾处理压力',
                '成功制作出3款天然洗护产品，通过皮肤敏感测试',
                '完成污水净化小实验，初步验证酵素对COD的降解效果',
                '经过实验证实酵素洗手液抑菌效果明显'
            ],
            image: 'resources/project-enzyme.jpg',
            wechatLink: 'https://mp.weixin.qq.com/s/example-enzyme',
            type: 'waste',
            location: {
                lat: 39.9900,
                lng: 116.3090
            }
        },
        {
            id: 'booth',
            title: '核酸亭改造',
            category: '创新利用',
            year: '2024年',
            participants: '15人',
            description: '核酸亭改造项目将疫情期间的核酸检测亭创造性地改造成校园服务设施，实现了资源的有效再利用。',
            details: [
                '需求调研：分析校园服务需求和空间分布',
                '功能设计：设计多种服务功能组合',
                '结构改造：进行安全性和功能性改造',
                '智能升级：集成太阳能供电和智能管理系统',
                '服务运营：建立可持续的运营模式'
            ],
            achievements: [
                '改造核酸亭8个',
                '服务覆盖学生3000余人',
                '节约建设成本70%',
                '获得创新设计奖项'
            ],
            image: 'resources/project-booth.jpg',
            wechatLink: 'https://mp.weixin.qq.com/s/example-booth',
            type: 'education',
            location: {
                lat: 39.9930,
                lng: 116.3110
            }
        },
        {
            id: 'club',
            title: '可持续校园社团',
            category: '社团活动',
            year: '2022年',
            participants: '60人',
            description: '可持续校园社团项目建立了长期性的校园环保组织，通过持续的活动和组织建设，培养学生的可持续发展意识。',
            details: [
                '组织架构：建立完整的社团组织结构',
                '活动策划：定期开展环保主题活动',
                '志愿者管理：建立志愿者招募和培训体系',
                '资源整合：整合校内外环保资源',
                '影响扩大：通过社交媒体扩大影响力'
            ],
            achievements: [
                '注册会员200余人',
                '举办活动50余场',
                '建立合作单位10家',
                '获得校级优秀社团称号'
            ],
            image: 'resources/project-club.jpg',
            wechatLink: 'https://mp.weixin.qq.com/s/example-club',
            type: 'education',
            location: {
                lat: 39.9915,
                lng: 116.3085
            }
        }
    ],
    
    // 团队成员
    team: [
        {
            name: '韩凌',
            role: '指导教师',
            department: '环境科学与工程学院',
            description: '环境科学与工程学院教授，开展可持续校园实践课程多年。',
            image: 'resources/team-member1.jpg',
            color: 'green'
        },
        {
            name: '曹思烨',
            role: '小组组长',
            department: '哲学系',
            description: '小组组长，负责组织各类活动，以及可持续社团的申办。',
            image: 'resources/team-member2.jpg',
            color: 'blue'
        },
        {
            name: '武建祺',
            role: '公众号负责人',
            department: '新闻与传播学院',
            description: '负责公众号推送的组织、撰写与发布。',
            image: 'resources/team-member3.jpg',
            color: 'orange'
        },
        {
            name: '吴依珍',
            role: '组员',
            department: '中国语言文学系',
            description: '参与公众号推送的撰写工作。',
            image: 'resources/team-member4.jpg',
            color: 'purple'
        },
        {
            name: '王一楷',
            role: '组员',
            department: '信息科学技术学院',
            description: '负责本网站的开发与运营，同时参与公众号推送的撰写。',
            image: 'resources/team-member5.jpg',
            color: 'blue'
        },
        {
            name: '尹川赫',
            role: '组员',
            department: '光华管理学院',
            description: '参与ppt制作等工作。',
            image: 'resources/team-member6.jpg',
            color: 'orange'
        },
        {
            name: '黄能慧',
            role: '组员',
            department: '数学科学学院',
            description: '参与ppt制作等工作。',
            image: 'resources/team-member7.jpg',
            color: 'green'
        }
    ],
    
    // 发展历程
    timeline: [
        {
            year: '2022年',
            title: '课程创立',
            description: '北京大学环境科学与工程学院开设"可持续校园实践"课程，首批30名学生参与，开展蔚秀园改造试点项目。',
            color: 'green',
            month: '9月'
        },
        {
            year: '2023年',
            title: '项目扩展',
            description: '课程项目扩展至6个，涵盖生态景观、绿色餐饮、生物多样性保护等多个领域，参与学生增至100余人。',
            color: 'blue',
            month: '3月'
        },
        {
            year: '2024年',
            title: '成果显著',
            description: '项目获得校级优秀教学成果奖，与3家企业建立合作关系，发表学术论文2篇，申请专利3项。',
            color: 'orange',
            month: '6月'
        },
        {
            year: '2025年',
            title: '展望未来',
            description: '计划扩展至更多高校，建立可持续发展教育联盟，推动形成全国性的绿色校园建设标准。',
            color: 'purple',
            month: '1月'
        }
    ],
    
    // 地图配置
    map: {
        center: [116.309087,39.991593], // 北京大学坐标
        zoom: 16,
        key: '2af2aacfc59717f760ca56328d699e95', // 高德地图API Key
        defaultMarkers: [
            {
                position: [116.303953,39.995514],
                title: '蔚秀园改造项目',
                type: 'project',
                description: '生态景观改造，集学习、休闲、生态教育于一体的绿色空间。',
                author: '项目团队',
                image: 'resources/project-weixiu.jpg',
                id: 'weixiu-marker'
            },
            {
                position: [116.310861,39.988691],
                title: '农园食堂',
                type: 'facility',
                description: '绿色餐饮示范点，推广可持续餐饮理念。',
                author: '食堂管理团队',
                image: 'resources/project-nongyuan.jpg',
                id: 'nongyuan-marker'
            },
            {
                position: [116.3090, 39.9900],
                title: '环保酵素制作点',
                type: 'education',
                description: '学生制作的环保酵素展示和体验点。',
                author: '酵素项目团队',
                image: 'resources/project-enzyme.jpg',
                id: 'enzyme-marker'
            },
            {
                position: [116.3085, 39.9915],
                title: '防鸟撞设施示范区',
                type: 'project',
                description: '鸟类友好型建筑设施展示和科普教育点。',
                author: '生物多样性保护团队',
                image: 'resources/project-bird.jpg',
                id: 'bird-marker'
            },
            {
                position: [116.30995,39.991946],
                title: '核酸亭改造',
                type: 'project',
                description: '将疫情期间的核酸检测亭创造性地改造成校园服务设施。',
                author: '核酸亭改造团队',
                image: 'resources/project-enzyme.jpg',
                id: 'bird-marker'
            }
        ],
        markerTypes: {
            project: {
                label: '可持续项目',
                color: '#2D5A27',
                icon: 'resources/icons/project.png'
            },
            facility: {
                label: '环保设施',
                color: '#4A7C59',
                icon: 'resources/icons/facility.png'
            },
            garden: {
                label: '绿色空间',
                color: '#8FBC8F',
                icon: 'resources/icons/garden.png'
            },
            education: {
                label: '教育场所',
                color: '#6B9BD2',
                icon: 'resources/icons/education.png'
            },
            other: {
                label: '其他',
                color: '#8B7355',
                icon: 'resources/icons/other.png'
            }
        }
    },
    
    // 社交媒体链接
    social: {
        wechat: '北大可持续校园',
        weibo: '',
        website: 'https://www.pku.edu.cn',
        github: 'https://github.com/yourusername/sustainable-campus-pku'
    },
    
    // 页脚信息
    footer: {
        copyright: '© 2025 北京大学可持续校园实践课程. 保留所有权利.',
        links: [
            { name: '北京大学', url: 'https://www.pku.edu.cn' },
            { name: '环境科学与工程学院', url: 'https://cese.pku.edu.cn' },
            { name: '项目GitHub', url: 'https://github.com/hawkwyk/sustainable-campus-pku' }
        ]
    },
    
    // 开发配置
    development: {
        debug: false, // 是否启用调试模式
        offlineMode: false, // 是否启用离线模式（使用本地数据）
        mockData: true, // 是否使用模拟数据
        apiEndpoint: 'https://sustainablepku-r07w0dml1-hawkwyks-projects.vercel.app/api/add-marker' // API端点
    }
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

// 全局变量
window.SITE_CONFIG = CONFIG;

// 配置验证函数
window.validateConfig = function() {
    const requiredFields = [
        'site.title',
        'contact.email', 
        'map.key',
        'github.owner',
        'github.repo'
    ];
    
    const missing = [];
    requiredFields.forEach(field => {
        const value = field.split('.').reduce((obj, key) => obj && obj[key], CONFIG);
        if (!value || value === 'your-github-username' || value === 'your-github-token') {
            missing.push(field);
        }
    });
    
    if (missing.length > 0) {
        console.warn('配置缺失字段:', missing);
        console.warn('请更新config.js文件中的相关配置');
    }
    
    return missing.length === 0;
};

// 自动验证配置
document.addEventListener('DOMContentLoaded', function() {
    window.validateConfig();
});