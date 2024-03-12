
try {
    // 初始化

    const initMessage = () => {
        console.clear()
        const strArray = ['Vizzy 简体中文语言包', ' Vizzy Chinese Language Pack', 'Matce. 240312-01'];
        console.dirxml(
            '%c ' + strArray[0] + ' %c ' + strArray[1] + ' %c ' + strArray[2] + ' %c ',
            'font-family: "Bahnschrift", "黑体"; background:#0d47a1; padding: 4px; border-radius: 3px 0 0 3px;  color: white',
            'font-family: "Bahnschrift", "黑体"; background:#1565c0; padding: 4px; color: white',
            'font-family: "Bahnschrift", "黑体"; background:#2196f3 ; padding: 4px; border-radius: 0 3px 3px 0;  color: white',
            'background:transparent'
        );
    }
    initMessage()

    // 日志开关
    isDev = true;

    // 替换器
    let element, selectSentence, selectOrder, selectLog
    const replacer = () => {
        initMessage()
        Object.keys(list).forEach(listKey => {
            list[listKey].items.forEach(item => {
                selectSentence = list[listKey].selector + " " + item.selector
                selectOrder = (item.order - 1) || 0
                selectLog = `document.querySelectorAll("${selectSentence}")[${selectOrder}]`
                // 选择
                element = document.querySelectorAll(selectSentence)[selectOrder]
                // 替换
                if (element) {
                    if (element.innerHTML.includes(item.source) || element.innerHTML.includes(item.translate)) {
                        element.innerHTML = element.innerHTML.replace(item.source, item.translate)
                    } else {
                        if (isDev) {
                            console.info("可替换文本所在元素内容与记录不匹配：" +
                                item.source + " → " + element.innerText + "，选择器：" + selectLog)
                        }
                    }
                } else {
                    if (isDev) {
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

            { selector: ".jss117 .MuiTypography-body1", source: "Release", translate: "更新" },
            { selector: ".MuiTypography-body2", order: 3, source: "Saved:", translate: "保存状态：" },

            { selector: ".MuiChip-label", order: 1, source: "Publish project", translate: "发布项目" },
            { selector: ".MuiChip-label", order: 2, source: "Explore creations", translate: "探索创意" },

            // { selector: ".MuiList-root #export", source: "Export", translate: "导出" },
        ]
    }
    list.sidebar = {
        selector: ".mosaic-window-body nav", // 侧边栏
        items: [
            { selector: ".jss161", order: 1, source: "Composition", translate: "组合" },
            { selector: ".jss161", order: 2, source: "Analyzers", translate: "分析" },
            { selector: ".jss161", order: 3, source: "Effects", translate: "效果" },
            { selector: ".jss161", order: 4, source: "Automations", translate: "动画" },
            { selector: ".jss161", order: 5, source: "Media", translate: "素材" },
            { selector: ".jss161", order: 6, source: "Projects", translate: "项目" },
            { selector: ".jss161", order: 7, source: "Lyrics mapper", translate: "歌词" },
        ]
    }
    list.sidebarPage = {
        selector: ".jss154", // 侧边栏页面
        items: [
            { selector: ".MuiTypography-noWrap", source: "Composition", translate: "组合" },
            { selector: ".MuiTypography-noWrap", source: "Audio Analyzers", translate: "音频分析器" },
            { selector: ".MuiTypography-noWrap", source: "Effects", translate: "效果" },

        ]
    }

    // 监听器
    window.removeEventListener('click', (event) => { replacer() });
    window.addEventListener('click', (event) => { replacer() })

    // 替换器执行
    replacer()

} catch (error) { console.dirxml(error) }