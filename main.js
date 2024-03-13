
try {
    const isDev = true;    // 总日志开关
    const logElementNotFound = false; // 未找到元素日志开关
    const replaceOnClick = true; // 点击事件触发替换开关

    // 初始化
    const initMessage = () => {
        if (isDev) {
            console.clear()
        }
        const strArray = ['Vizzy 简体中文语言包', ' Vizzy Chinese Language Pack', 'Matce. 240314-03'];
        console.dirxml(
            '%c ' + strArray[0] + ' %c ' + strArray[1] + ' %c ' + strArray[2] + ' %c ',
            'font-family: "Bahnschrift", "黑体"; background:#0d47a1; padding: 4px; border-radius: 3px 0 0 3px;  color: white',
            'font-family: "Bahnschrift", "黑体"; background:#1565c0; padding: 4px; color: white',
            'font-family: "Bahnschrift", "黑体"; background:#2196f3 ; padding: 4px; border-radius: 0 3px 3px 0;  color: white',
            'background:transparent'
        );
    }
    initMessage()



    // 替换器
    let element, selectSentence, selectOrder, selectLog
    const replacer = () => {
        Object.keys(list).forEach(listKey => { // 遍历列表的每个键
            list[listKey].items.forEach(item => { // 遍历每个键的每个项
                selectSentence = list[listKey].selector + (item.selector ? (" " + item.selector) : "")// 构造选择器语句，如果 item.selector 存在，则添加到语句中
                selectOrder = (item.order - 1) || 0 // 获取顺序，如果 item.order 不存在，则默认为 0
                selectLog = `document.querySelectorAll("${selectSentence}")[${selectOrder}]` // 构造选择器日志，用于调试
                // 选择 ///////////////////////////////////////////////////////////////////////
                element = document.querySelectorAll(selectSentence)[selectOrder]
                // 替换 ///////////////////////////////////////////////////////////////////////
                if (element) { // 如果元素存在，则进行替换操作
                    if (element.innerHTML.includes(item.source) || element.innerHTML.includes(item.translate)) { // 如果元素的内部 HTML 包含源文本或翻译文本
                        element.innerHTML = element.innerHTML.replace(item.source, item.translate) // 替换源文本为翻译文本
                    } else { // 如果处于开发模式，并且元素的内部 HTML 不包含同级中的任何源文本或翻译文本
                        if (isDev && !list[listKey].items.some(item2 => element.innerHTML.includes(item2.source) || element.innerHTML.includes(item2.translate))) {
                            console.info("可替换文本所在元素内容与记录不匹配：" +
                                item.source + " → " + element.innerText + "，选择器：" + selectLog)
                        }
                    }
                } else {
                    if (isDev && logElementNotFound) { // 如果处于开发模式，并且没有找到元素
                        console.info("未找到可替换文本所在元素：" + selectLog)
                    }
                }
            });
        });
    }

    // 对应表
    const list = {}
    list.rootNav = {
        selector: ".MuiPaper-root", // 顶部栏
        items: [
            { selector: "#file-menu-button .MuiButton-label", source: "File", translate: "文件" },
            { selector: "#edit-menu-button .MuiButton-label", source: "Edit", translate: "编辑" },
            { selector: "#project-menu-button .MuiButton-label", source: "Project", translate: "项目" },
            { selector: "#view-menu-button .MuiButton-label", source: "View", translate: "视图" },
            { selector: "#help-menu-button .MuiButton-label", source: "Help", translate: "帮助" },
            { selector: "a.MuiButtonBase-root .MuiButton-label", source: "Donate", translate: "捐赠" },

            { selector: ".MuiTypography-body1", source: "Release", translate: "更新" },
            { selector: ".MuiTypography-body2", order: 3, source: "Saved:", translate: "保存状态：" },

            { selector: ".MuiChip-label", order: 1, source: "Publish project", translate: "发布项目" },
            { selector: ".MuiChip-label", order: 1, source: "Explore creations", translate: "探索创意" },
            { selector: ".MuiChip-label", order: 2, source: "Explore creations", translate: "探索创意" },
        ]
    }
    list.sidebar = {
        selector: ".mosaic-window-body nav", // 侧边栏
        items: [
            { selector: "span", order: 1, source: "Composition", translate: "组合" },
            { selector: "span", order: 3, source: "Analyzers", translate: "分析" },
            { selector: "span", order: 5, source: "Effects", translate: "效果" },
            { selector: "span", order: 7, source: "Automations", translate: "动画" },
            { selector: "span", order: 9, source: "Media", translate: "素材" },
            { selector: "span", order: 11, source: "Projects", translate: "项目" },
            { selector: "span", order: 13, source: "Lyrics mapper", translate: "歌词" },
        ]
    }
    list.sidebarPageComposition = {
        selector: ".mosaic-window-body div.react-contextmenu-wrapper[style='height: 100%;']", // 侧边栏页面 组合页
        items: [
            { selector: ".MuiTypography-noWrap", source: "Composition", translate: "组合" },
        ]
    }

    list.sidebarPageAnalyzers = {
        selector: ".mosaic-window-body #analyzerDiv", // 侧边栏页面 分析页
        items: [
            { selector: ".MuiTypography-noWrap", source: "Audio Analyzers", translate: "音频分析器" },
        ]
    }

    list.sidebarPageEffects = {
        selector: ".mosaic-window-body #effectsDiv", // 侧边栏页面 效果页
        items: [
            { selector: ".MuiTypography-noWrap", source: "Effects", translate: "效果" },
        ]
    }

    list.sidebarAutomationsEffects = {
        selector: ".mosaic-window-body #automationsDiv", // 侧边栏页面 动画页
        items: [
            { selector: ".MuiTypography-noWrap", source: "Automations", translate: "动画" },
        ]
    }

    list.sidebarPageMedia = {
        selector: ".mosaic-window-body #mediaDiv", // 侧边栏页面 素材页
        items: [
            { selector: ".MuiTypography-noWrap", order: 1, source: "Audio", translate: "音频" },
            { selector: ".MuiTypography-noWrap", order: 2, source: "Images", translate: "图片" },
            { selector: ".MuiTypography-noWrap", order: 3, source: "Video", translate: "视频" },

            { selector: "button.MuiButton-outlined", order: 1, source: "Uploads", translate: "上传" },
            { selector: "button.MuiButton-outlined", order: 2, source: "Stock", translate: "素材库" },
        ]
    }

    list.tooltipRight = {
        selector: ".MuiTooltip-popper[x-placement=right]", // 向右的悬浮提示框
        items: [
            // 侧边栏页面标题
            { source: "Composition", translate: "组合" },
            { source: "Analyzers", translate: "音频分析器" },
            { source: "Effects", translate: "效果" },
            { source: "Automations", translate: "动画" },
            { source: "Media", translate: "素材" },
            { source: "Projects", translate: "项目" },
            { source: "Lyrics mapper", translate: "歌词" },
        ]
    }

    list.tooltipBottom = {
        selector: ".MuiTooltip-popper[x-placement=bottom]", // 向下的悬浮提示框
        items: [
            // 侧边栏页面 素材页
            { source: "Show your uploads", translate: "查看你上传过的文件" },
            { source: "Search and use stock media provided by", translate: "查看素材库，提供方：" },
            // 顶部栏
            { source: "Publishes project to the community creations page", translate: "将项目公开发布至社区" },
            { source: "Share project", translate: "分享此项目" },
            { source: "Notifications", translate: "消息通知" },
            // 侧边栏页面 组合页
            { source: "Open audio processing settings", translate: "打开音频处理设置" },
            { source: "Open render settings", translate: "打开渲染设置" },
            { source: "Clear all objects", translate: "清除所有元素" },
            { source: "Add new layer", translate: "新建分层" },
            { source: "Show automations", translate: "显示动画" },
            { source: "Show controllers", translate: "显示控制器" },
            // 侧边栏页面 分析页
            { source: "Add audio analyzer", translate: "添加音频分析器" },
            // 侧边栏页面 效果页
            { source: "Show connections", translate: "显示连接列表" },
            { source: "List all effects", translate: "显示效果列表" },
            { source: "Add effect", translate: "添加效果" },
            // 侧边栏页面 动画页
            { source: "Add folder", translate: "新建文件夹" },
            { source: "Add automation", translate: "添加动画" },
            // 侧边栏页面 歌词页
            { source: "Automatically calculate timespan", translate: "自动计算时间跨度" },
            { source: "Manually set timespan", translate: "手动设置时间跨度" },
            { source: "Turn off gapless mode", translate: "关闭无间隙模式" },
            { source: "Gapless mode", translate: "无间隙模式" },
            { source: "Start mapping lyrics", translate: "开始映射歌词" },
            { source: "Edit text", translate: "编辑文本" },
        ]
    }

    list.tooltipTop = {
        selector: ".MuiTooltip-popper[x-placement=top]", // 向上的悬浮提示框
        items: [
            // 底部工具栏
            { source: "Zoom in track", translate: "放大音轨" },
            { source: "Zoom out track", translate: "缩小音轨" },
            { source: "Loop song", translate: "循环播放曲目" },
            { source: "Don't loop song", translate: "取消循环播放曲目" },
            { source: "Hide keyframes", translate: "隐藏关键帧" },
            { source: "Show keyframes", translate: "显示关键帧" },
            { source: "Stop", translate: "终止播放" },
            { source: "Back one frame", translate: "往前一帧" },
            { source: "Play", translate: "开始播放" },
            { source: "Pause", translate: "暂停播放" },
            { source: "Forward one frame", translate: "往后一帧" },
            // 视频窗口
            { source: "Move", translate: "移动元素" },
            { source: "Line to", translate: "直线至" },
            { source: "Quad to", translate: "二次曲线至" },
            { source: "Arc to", translate: "弧线至" },
            { source: "Toggle 3D mode", translate: "2D/3D 模式切换" },
            { source: "Open external preview", translate: "打开外部预览窗口" },
            // 侧边栏页面 组合页
            { source: "Add effect", translate: "添加效果" },
            { source: "Add item", translate: "添加元素" },
            { source: "Add automation", translate: "添加动画" },
            // 侧边栏页面 分析页
            { source: "Don't show info text again", translate: "不再显示此信息" },
            { source: "Rename", translate: "重命名" },
            { source: "Delete", translate: "删除" },
            // 侧边栏页面 效果页
            { source: "Effect", translate: "效果" },
            { source: "Layer: ", translate: "层：" },
            // 侧边栏页面 动画页
            { source: "Add object to automation", translate: "给动画添加元素" },
            { source: "Expand", translate: "展开" },
            { source: "Close", translate: "收起" },
            { source: "Audio impact automation", translate: "受音频影响的动画" },
            // 侧边栏页面 动画页
            { source: "Add object to automation", translate: "给动画添加元素" },
            { source: "Expand", translate: "展开" },
            { source: "Close", translate: "收起" },
            { source: "Audio impact automation", translate: "受音频影响的动画" },
            // 侧边栏页面 素材页
            { source: "Search images provided by", translate: "搜索图片素材，提供方：" },
            { source: "Search videos provided by", translate: "搜索视频素材，提供方：" },
            // 侧边栏页面 歌词页
            { source: "Split selected text into different rows", translate: "将所选文本拆分成多行" },
            { source: "Join selected text into same row", translate: "将所选文本合并到同一行" },
        ]
    }

    list.bottomToolBar = {
        selector: ".mosaic-tile:nth-child(7) .mosaic-window-body", // 底部工具栏
        items: [
            { selector: "#chooseAudioButton .MuiButton-label", source: "Choose audio", translate: "选择音频" },
        ]
    }

    // 监听器
    if (replaceOnClick) {
        window.removeEventListener('click', (event) => { replacer() });
        window.addEventListener('click', (event) => { replacer() })
    }

    // 实时执行
    if (typeof VCLPInterval !== 'undefined') {
        clearInterval(VCLPInterval)
    }
    window.VCLPInterval = setInterval(() => { replacer() }, 500)

} catch (error) { console.dirxml(error) }


