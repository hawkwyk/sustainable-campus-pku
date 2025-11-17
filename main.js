/**
 * 可持续校园实践网站主要JavaScript文件
 * 包含所有页面的通用交互逻辑和工具函数
 * 版本: 2025.1.0
 */

// 全局变量
let isLoading = false;
let currentPage = '';
let isInitialized = false;

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    if (isInitialized) return;
    
    console.log('可持续校园实践网站初始化...');
    
    // 等待配置加载
    if (typeof window.SITE_CONFIG === 'undefined') {
        setTimeout(() => {
            if (typeof window.SITE_CONFIG !== 'undefined') {
                initializeApp();
            } else {
                console.error('配置加载失败');
            }
        }, 100);
    } else {
        initializeApp();
    }
});

// 初始化应用
function initializeApp() {
    try {
        initializeGlobalFeatures();
        detectCurrentPage();
        initializePageSpecificFeatures();
        isInitialized = true;
        console.log('网站初始化完成');
    } catch (error) {
        console.error('初始化错误:', error);
    }
}

// 初始化全局功能
function initializeGlobalFeatures() {
    // 初始化导航
    initializeNavigation();
    
    // 初始化滚动效果
    initializeScrollEffects();
    
    // 初始化加载动画
    initializeLoadingAnimation();
    
    // 初始化错误处理
    initializeErrorHandling();
    
    // 初始化性能监控
    initializePerformanceMonitoring();
    
    // 初始化工具函数
    initializeUtils();
    
    // 初始化服务工作者（如果支持）
    if ('serviceWorker' in navigator) {
        initializeServiceWorker();
    }
}

// 检测当前页面
function detectCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop() || 'index.html';
    
    if (filename === 'index.html' || filename === '') {
        currentPage = 'home';
    } else if (filename === 'projects.html') {
        currentPage = 'projects';
    } else if (filename === 'tour.html') {
        currentPage = 'tour';
    } else if (filename === 'about.html') {
        currentPage = 'about';
    } else {
        currentPage = 'unknown';
    }
    
    console.log('当前页面:', currentPage);
}

// 初始化页面特定功能
function initializePageSpecificFeatures() {
    switch (currentPage) {
        case 'home':
            initializeHomePage();
            break;
        case 'projects':
            initializeProjectsPage();
            break;
        case 'tour':
            initializeTourPage();
            break;
        case 'about':
            initializeAboutPage();
            break;
    }
}

// 导航功能
function initializeNavigation() {
    // 移动端菜单切换
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // 动画效果
            if (!mobileMenu.classList.contains('hidden')) {
                anime({
                    targets: mobileMenu,
                    opacity: [0, 1],
                    translateY: [-20, 0],
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            }
        });
        
        // 点击外部关闭菜单
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
    
    // 导航链接高亮
    highlightCurrentNavItem();
    
    // 平滑滚动到锚点
    initializeSmoothScrolling();
    
    // 导航栏滚动效果
    initializeNavScrollEffect();
}

// 高亮当前导航项
function highlightCurrentNavItem() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPath.includes(href)) {
            link.classList.add('text-green-600', 'font-semibold');
            link.classList.remove('text-gray-600', 'text-gray-800');
        }
    });
}

// 平滑滚动
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // 考虑导航栏高度
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 导航栏滚动效果
function initializeNavScrollEffect() {
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');
    
    if (nav) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // 向下滚动，隐藏导航栏
                nav.style.transform = 'translateY(-100%)';
            } else {
                // 向上滚动，显示导航栏
                nav.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
}

// 滚动效果
function initializeScrollEffects() {
    // 滚动显示动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // 添加延迟动画
                const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                entry.target.style.transitionDelay = delay + 'ms';
            }
        });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// 加载动画
function initializeLoadingAnimation() {
    // 页面加载完成后的动画
    window.addEventListener('load', function() {
        // 隐藏加载动画
        const loader = document.getElementById('page-loader');
        if (loader) {
            anime({
                targets: loader,
                opacity: 0,
                duration: 500,
                complete: function() {
                    loader.style.display = 'none';
                }
            });
        }
        
        // 页面元素进入动画
        anime({
            targets: '.scroll-reveal',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutQuad'
        });
    });
}

// 错误处理
function initializeErrorHandling() {
    // 全局错误处理
    window.addEventListener('error', function(event) {
        console.error('全局错误:', event.error);
        showNotification('页面出现错误，请刷新重试', 'error');
    });
    
    // Promise错误处理
    window.addEventListener('unhandledrejection', function(event) {
        console.error('未处理的Promise错误:', event.reason);
        showNotification('操作失败，请重试', 'error');
    });
    
    // 图片加载错误处理
    document.addEventListener('error', function(event) {
        if (event.target.tagName === 'IMG') {
            event.target.src = 'resources/logo.png'; // 默认图片
            event.target.alt = '图片加载失败';
        }
    }, true);
}

// 性能监控
function initializePerformanceMonitoring() {
    // 监控页面加载性能
    window.addEventListener('load', function() {
        setTimeout(function() {
            try {
                const perfData = performance.getEntriesByType('navigation')[0];
                const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                
                console.log('页面加载时间:', loadTime + 'ms');
                
                if (loadTime > 3000) {
                    console.warn('页面加载较慢，建议优化');
                }
            } catch (error) {
                console.warn('无法获取性能数据:', error);
            }
        }, 0);
    });
    
    // 监控内存使用
    if ('memory' in performance) {
        setInterval(function() {
            try {
                const memory = performance.memory;
                const usedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
                
                if (usedMB > 50) {
                    console.warn('内存使用较高:', usedMB + 'MB');
                }
            } catch (error) {
                // 忽略错误
            }
        }, 30000);
    }
}

// 初始化工具函数
function initializeUtils() {
    // 添加全局工具函数到window对象
    window.SustainableCampus = {
        showNotification,
        debounce,
        throttle,
        isInViewport,
        getUrlParameter,
        formatDate,
        truncateText,
        generateId,
        copyToClipboard,
        validateEmail,
        validateForm,
        loading: {
            show: showLoading,
            hide: hideLoading
        }
    };
}

// 初始化服务工作者
function initializeServiceWorker() {
    try {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('Service Worker 注册成功:', registration);
            })
            .catch(function(error) {
                console.log('Service Worker 注册失败:', error);
            });
    } catch (error) {
        console.warn('Service Worker 不支持:', error);
    }
}

// 主页特定功能
function initializeHomePage() {
    // 初始化统计图表
    initializeStatsChart();
    
    // 初始化项目轮播
    initializeProjectsCarousel();
    
    // 初始化数字动画
    initializeCounterAnimation();
    
    // 初始化特色功能
    initializeHomeFeatures();
}

// 统计图表
function initializeStatsChart() {
    const chartDom = document.getElementById('stats-chart');
    if (!chartDom) return;
    
    try {
        const myChart = echarts.init(chartDom);
        
        const option = {
            title: {
                text: '项目成果统计',
                left: 'center',
                textStyle: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#2C3E50'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['项目数量', '参与人数', '影响范围'],
                bottom: 10
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['2022年', '2023年', '2024年', '2025年']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '项目数量',
                    type: 'bar',
                    data: [3, 6, 9, 12],
                    itemStyle: {
                        color: '#2D5A27'
                    }
                },
                {
                    name: '参与人数',
                    type: 'bar',
                    data: [50, 100, 150, 200],
                    itemStyle: {
                        color: '#4A7C59'
                    }
                },
                {
                    name: '影响范围',
                    type: 'line',
                    data: [20, 40, 65, 85],
                    itemStyle: {
                        color: '#D2691E'
                    }
                }
            ]
        };
        
        myChart.setOption(option);
        
        // 响应式图表
        window.addEventListener('resize', function() {
            myChart.resize();
        });
        
        // 图表动画
        setTimeout(() => {
            myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: 3
            });
        }, 1000);
        
    } catch (error) {
        console.error('图表初始化失败:', error);
    }
}

// 项目轮播
function initializeProjectsCarousel() {
    const carousel = document.getElementById('projects-carousel');
    if (!carousel) return;
    
    try {
        new Splide(carousel, {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                768: {
                    perPage: 1,
                },
                1024: {
                    perPage: 2,
                }
            },
            classes: {
                arrows: 'splide__arrows custom-arrows',
                arrow: 'splide__arrow custom-arrow',
                prev: 'splide__arrow--prev custom-prev',
                next: 'splide__arrow--next custom-next',
            }
        }).mount();
        
    } catch (error) {
        console.error('轮播初始化失败:', error);
    }
}

// 数字动画
function initializeCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent.replace(/\D/g, ''));
                const suffix = target.textContent.replace(/[\d]/g, '');
                
                anime({
                    targets: { value: 0 },
                    value: finalValue,
                    duration: 2000,
                    easing: 'easeOutQuad',
                    update: function(anim) {
                        target.textContent = Math.round(anim.animatables[0].target.value) + suffix;
                    }
                });
                
                observer.unobserve(target);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// 主页特色功能
function initializeHomeFeatures() {
    // 添加欢迎消息
    setTimeout(() => {
        if (window.SustainableCampus) {
            window.SustainableCampus.showNotification('欢迎来到北京大学可持续校园实践网站！', 'success');
        }
    }, 2000);
}

// 项目页面特定功能
function initializeProjectsPage() {
    // 初始化项目筛选
    initializeProjectFilters();
    
    // 初始化项目搜索
    initializeProjectSearch();
    
    // 初始化项目模态框
    initializeProjectModal();
}

// 项目筛选
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新活跃按钮
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            let visibleCount = 0;
            
            projectCards.forEach((card, index) => {
                const shouldShow = filter === 'all' || card.getAttribute('data-category') === filter;
                
                if (shouldShow) {
                    card.style.display = 'block';
                    visibleCount++;
                    
                    // 添加延迟动画
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        delay: index * 100,
                        duration: 400,
                        easing: 'easeOutQuad'
                    });
                } else {
                    card.style.display = 'none';
                }
            });
            
            // 显示/隐藏无结果消息
            const noResults = document.getElementById('no-results');
            if (noResults) {
                if (visibleCount === 0) {
                    noResults.classList.remove('hidden');
                } else {
                    noResults.classList.add('hidden');
                }
            }
        });
    });
}

// 项目搜索
function initializeProjectSearch() {
    const searchInput = document.getElementById('search-input');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const searchTerm = this.value.toLowerCase();
            let visibleCount = 0;
            
            projectCards.forEach((card, index) => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                const category = card.querySelector('.text-xs').textContent.toLowerCase();
                
                const shouldShow = title.includes(searchTerm) || 
                                 description.includes(searchTerm) || 
                                 category.includes(searchTerm);
                
                if (shouldShow) {
                    card.style.display = 'block';
                    visibleCount++;
                    
                    // 搜索结果的动画
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        scale: [0.9, 1],
                        delay: index * 50,
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                } else {
                    card.style.display = 'none';
                }
            });
            
            // 显示/隐藏无结果消息
            const noResults = document.getElementById('no-results');
            if (noResults) {
                if (visibleCount === 0) {
                    noResults.classList.remove('hidden');
                } else {
                    noResults.classList.add('hidden');
                }
            }
        }, 300);
    });
}

// 项目模态框
function initializeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    // 关闭模态框
    window.closeModal = function() {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        
        // 动画效果
        anime({
            targets: modal.querySelector('.modal-content'),
            scale: [1, 0.8],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInQuad'
        });
    };
    
    // 点击外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // ESC键关闭
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// 地图页面特定功能
function initializeTourPage() {
    // 地图功能在tour.html中单独实现
    console.log('地图页面初始化完成');
}

// 关于页面特定功能
function initializeAboutPage() {
    // 初始化联系表单
    initializeContactForm();
    
    // 初始化时间线动画
    initializeTimelineAnimation();
}

// 联系表单
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // 显示加载状态
        submitBtn.textContent = '发送中...';
        submitBtn.disabled = true;
        
        // 模拟提交过程
        setTimeout(() => {
            showNotification('消息发送成功！我们会尽快回复您。', 'success');
            form.reset();
            
            // 重置按钮
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// 时间线动画
function initializeTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateX: [-50, 0],
                    opacity: [0, 1],
                    duration: 600,
                    easing: 'easeOutQuad'
                });
                
                observer.unobserve(entry.target);
            }
        });
    });
    
    timelineItems.forEach(item => observer.observe(item));
}

// 工具函数

// 显示通知
function showNotification(message, type = 'info', duration = 3000) {
    // 移除现有通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        hideNotification(existingNotification);
    }
    
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${getNotificationClass(type)}`;
    notification.innerHTML = `
        <div class="flex items-center">
            <div class="flex-shrink-0">
                ${getNotificationIcon(type)}
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium">${message}</p>
            </div>
            <div class="ml-auto pl-3">
                <button class="notification-close text-gray-400 hover:text-gray-600">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 动画显示
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // 关闭按钮
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // 自动隐藏
    setTimeout(() => {
        hideNotification(notification);
    }, duration);
}

// 隐藏通知
function hideNotification(notification) {
    anime({
        targets: notification,
        translateX: [0, 300],
        opacity: [1, 0],
        duration: 300,
        easing: 'easeInQuad',
        complete: function() {
            notification.remove();
        }
    });
}

// 获取通知样式类
function getNotificationClass(type) {
    const classes = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white'
    };
    return classes[type] || classes.info;
}

// 获取通知图标
function getNotificationIcon(type) {
    const icons = {
        success: '<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>',
        error: '<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>',
        warning: '<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>',
        info: '<svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
    };
    return icons[type] || icons.info;
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 检查元素是否在视口中
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 获取URL参数
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// 格式化日期
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('zh-CN', options);
}

// 截断文本
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}

// 生成随机ID
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// 复制到剪贴板
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            showNotification('已复制到剪贴板', 'success');
        }).catch(function(err) {
            console.error('复制失败:', err);
            showNotification('复制失败', 'error');
        });
    } else {
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('已复制到剪贴板', 'success');
    }
}

// 验证邮箱
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// 验证表单
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('border-red-500');
            isValid = false;
        } else {
            field.classList.remove('border-red-500');
        }
        
        // 邮箱特殊验证
        if (field.type === 'email' && field.value.trim()) {
            if (!validateEmail(field.value)) {
                field.classList.add('border-red-500');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// 显示加载
function showLoading(element) {
    if (element) {
        element.classList.add('loading');
        element.disabled = true;
    }
}

// 隐藏加载
function hideLoading(element) {
    if (element) {
        element.classList.remove('loading');
        element.disabled = false;
    }
}

// 导出函数供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        debounce,
        throttle,
        isInViewport,
        getUrlParameter,
        formatDate,
        truncateText,
        generateId,
        copyToClipboard,
        validateEmail,
        validateForm
    };
}