/* 开源仓库图谱 · 数据源
   加仓库只改这里：往 repos 数组追加一条即可，刷新页面生效。
   字段说明：
     id        唯一标识（英文短横线）
     name      展示名
     category  所属分类 id（对应 categories[].id）
     desc      一句话说明
     upstream  上游原仓库 / 原文地址
     mine      我自己的仓库地址（fork 或镜像）；外链条目留空
     kind      fork | mirror | link
     lang      主语言（可空）
     license   许可证（可空）
     stars     上游 star 数（可空）
     icon      卡片图标（emoji）
     note      可选，卡片上的补充提示
*/
window.REPO_DATA = {
  updated: "2026-11-25",
  owner: "HEIGUAN12138",
  categories: [
    { id: "construction", name: "工程与建筑", icon: "🏗️", desc: "工地、施工、现场管理" },
    { id: "retail",       name: "零售与电商", icon: "🛒", desc: "商城、订单、交易" },
    { id: "property",     name: "物业与社区", icon: "🏢", desc: "小区、物业、业主服务" },
    { id: "warehouse",    name: "仓储与物流", icon: "📦", desc: "WMS、库存、出入库" },
    { id: "erp",          name: "企业信息化", icon: "🏭", desc: "ERP、进销存、制造业" },
    { id: "community",    name: "社区与论坛", icon: "💬", desc: "论坛、贴吧、内容社区" },
    { id: "learning",     name: "学习与资源", icon: "📚", desc: "知识库、技术合集" },
    { id: "frontend",     name: "前端与小程序", icon: "📱", desc: "小程序、跨端、全栈示例" },
    { id: "ai",           name: "AI 编程", icon: "🤖", desc: "AI 工具、编程实践" }
  ],
  repos: [
    {
      id: "yf-construction",
      name: "智慧工地",
      category: "construction",
      desc: "工程现场管理，覆盖项目、人员、设备与安全",
      upstream: "https://gitee.com/qingyun-software/YFConstruction",
      mine: "https://github.com/HEIGUAN12138/YFConstruction",
      kind: "mirror",
      lang: "Java",
      license: "MulanPSL-2.0",
      stars: 50,
      icon: "🏗️"
    },
    {
      id: "shopxo",
      name: "ShopXO 商城",
      category: "retail",
      desc: "开源电商系统，支持多端、多商户与营销玩法",
      upstream: "https://gitee.com/zongzhige/shopxo",
      mine: "https://github.com/HEIGUAN12138/shopxo",
      kind: "mirror",
      lang: "PHP",
      license: "MIT",
      stars: 23784,
      icon: "🛒"
    },
    {
      id: "wechat-owner-service",
      name: "HC 小区物业",
      category: "property",
      desc: "开源物业管理系统：缴费、报修、投诉、访客与公告",
      upstream: "https://gitee.com/java110/WechatOwnerService",
      mine: "https://github.com/HEIGUAN12138/WechatOwnerService",
      kind: "mirror",
      lang: "Java",
      license: "Apache-2.0",
      stars: 1582,
      icon: "🏢"
    },
    {
      id: "jeewms",
      name: "JeeWMS",
      category: "warehouse",
      desc: "仓储管理开源版，覆盖入库、出库、库位与盘点",
      upstream: "https://github.com/erzhongxmu/JeeWMS",
      mine: "https://github.com/HEIGUAN12138/JeeWMS",
      kind: "fork",
      lang: "Java",
      license: "GPL-3.0",
      stars: 154,
      icon: "📦"
    },
    {
      id: "t3rik-erp",
      name: "t3rik-erp",
      category: "erp",
      desc: "轻量 ERP 系统，进销存与生产管理",
      upstream: "https://github.com/WangSanPing/t3rik-erp",
      mine: "https://github.com/HEIGUAN12138/t3rik-erp",
      kind: "fork",
      lang: "Java",
      license: "Apache-2.0",
      stars: 70,
      icon: "🏭"
    },
    {
      id: "linfeng-community",
      name: "凌风社区",
      category: "community",
      desc: "论坛 / 贴吧系统，支持板块、帖子与回复",
      upstream: "https://github.com/virus010101/linfeng-community",
      mine: "https://github.com/HEIGUAN12138/linfeng-community",
      kind: "fork",
      lang: "Vue",
      license: "",
      stars: 615,
      icon: "💬",
      note: "上游未声明 LICENSE，仅供学习参考"
    },
    {
      id: "byoungd-up",
      name: "byoungd/up",
      category: "learning",
      desc: "技术资源合集，长期更新的学习路线与资料清单",
      upstream: "https://github.com/byoungd/up",
      mine: "https://github.com/HEIGUAN12138/up",
      kind: "fork",
      lang: "JavaScript",
      license: "NOASSERTION",
      stars: 70888,
      icon: "📚"
    },
    {
      id: "book-mall-mini",
      name: "图书商城小程序",
      category: "frontend",
      desc: "小程序全栈示例：页面、组件与后端接口串讲",
      upstream: "https://www.aiyuanma.vip/posts/book-mall-pure-mini-program",
      mine: "",
      kind: "link",
      lang: "",
      license: "",
      stars: 0,
      icon: "📱",
      note: "教程原文，非仓库"
    },
    {
      id: "claude-guide",
      name: "Claude 使用指南",
      category: "ai",
      desc: "AI 编程实践与提示词技巧整理",
      upstream: "https://www.yerlock.com/guides/claude.html",
      mine: "",
      kind: "link",
      lang: "",
      license: "",
      stars: 0,
      icon: "🤖",
      note: "网页指南，非仓库"
    }
  ]
};