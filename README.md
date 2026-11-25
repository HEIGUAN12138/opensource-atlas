# 开源仓库图谱 · Open Source Atlas

按**业务领域**整理的开源仓库索引。每个领域下面是具体仓库，卡片点开直达我自己账号下的 fork / 镜像仓库，方便照着抄业务、拆代码。

- 在线站点：<https://heiguan12138.github.io/opensource-atlas/>
- 姊妹站（网址书签）：<https://heiguan12138.github.io/menav/?page=bookmarks>
- 所有仓库都在 [`HEIGUAN12138`](https://github.com/HEIGUAN12138) 名下

## 现在收录了什么

| 业务领域 | 仓库 | 来源 | 我这边 |
| --- | --- | --- | --- |
| 工程与建筑 | 智慧工地 YFConstruction | Gitee | 镜像 |
| 零售与电商 | ShopXO 商城 | Gitee | 镜像 |
| 物业与社区 | HC 小区物业 WechatOwnerService | Gitee | 镜像 |
| 仓储与物流 | JeeWMS | GitHub | Fork |
| 企业信息化 | t3rik-erp | GitHub | Fork |
| 社区与论坛 | 凌风社区 linfeng-community | GitHub | Fork |
| 学习与资源 | byoungd/up | GitHub | Fork |
| 前端与小程序 | 图书商城小程序（教程原文） | 网页 | 外链 |
| AI 编程 | Claude 使用指南（网页） | 网页 | 外链 |

GitHub 上的 Fork 会带上原始 star / LICENSE；Gitee 的仓库用「镜像」方式整体搬到 GitHub（Gitee 的 `refs/pull/*` 在 GitHub 是 hidden ref，推不上去，属正常现象）。

## 加一个新仓库

只改一个文件：`data/repos.js`。

1. 想加**新领域**：往 `categories` 里加 `{ id, name, icon, desc }`。
2. 加**仓库**：往 `repos` 里追加一条：

```js
{
  id: "my-repo",              // 唯一标识
  name: "仓库展示名",
  category: "warehouse",      // 对应 categories 里的 id
  desc: "一句话说明它解决什么业务问题",
  upstream: "https://github.com/xxx/yyy",
  mine: "https://github.com/HEIGUAN12138/yyy",  // 我自己的 fork / 镜像
  kind: "fork",               // fork | mirror | link
  lang: "Java",
  license: "MIT",
  stars: 154,
  icon: "📦",
  note: "可选提示"
}
```

改完刷新页面即可，无需构建。

## 目录结构

```
opensource-atlas/
├── index.html          # 页面骨架（顶栏 / 侧栏 / 主区）
├── assets/
│   ├── style.css       # 全部样式（浅色 + 深色 + 响应式）
│   └── app.js          # 渲染、搜索、分类高亮、主题切换
├── data/
│   └── repos.js        # 唯一数据源：分类 + 仓库
└── README.md
```

纯静态站点，零依赖、零构建，GitHub Pages 直接托管。

## 本地预览

```powershell
python -m http.server 8899 --directory opensource-atlas
# 打开 http://127.0.0.1:8899/
```

## 交互

- `/` 聚焦搜索，`Esc` 清空
- 搜索匹配仓库名、描述、语言、许可证、领域名
- 左侧领域可点击跳转，滚动时自动高亮
- 右上角切换深浅色（跟随系统，记住选择）
- 深色可直接用 `?theme=dark` 链接分享

## 维护约定

- 一个仓库只归一个领域；跨领域的在 `desc` 里点明另一面。
- `mine` 优先于 `upstream`：卡片默认跳我自己的仓库，没有才跳上游。
- 不是仓库的东西（教程、网页指南）用 `kind: "link"`，并在 `note` 里说明「非仓库」。