import './updateHistory.css'

const HISTORY = [
  {
    date: '2026.09.26',
    items: [
      '「节点混合面板」新增「无缝贴图」节点（英文：Convert to Seamless Texture），把输入的噪波效果图转换为可平铺的无缝贴图，平铺后看不到接缝。',
      '位置：节点混合面板（/nodeEditor）→「添加节点」→「艺术」分类 →「无缝贴图」。',
      '查询方法：在节点列表顶部的搜索框输入「无缝」「Seamless」或「Convert」即可找到；选中该节点后，点击节点标题右侧的「?」可打开它的帮助文档（/nodeDocument/artistic-seamless）。',
      '参数面板分上下两部分：上半为参数（边缘带宽、平铺检测 2×2 / 3×3 / 4×4），下半为拼接效果预览，实时查看无缝平铺结果。',
    ],
  },
  {
    date: '2026.09.25',
    items: [
      '新增「节点混合面板」，节点连线式操作：把噪波、数学、通道、艺术、法线等节点拖入画布，拖拽端口连线即可组合效果。内置「混合」节点，支持正片叠底 / 滤色 / 叠加等模式叠加两图，并可加遮罩与不透明度。相比单参数调节更灵活，效果可复用，节点图支持保存 / 读取。',
      '支持导出法线贴图：添加「黑白转法线」节点，把噪波或灰度图连入，再接入「输出」节点，点击「导出 PNG」即可。',
    ],
  },
  {
    date: '2026.08.02',
    items: [
      '优化部分 bug，支持分享指定 noise 链接。',
      '下架 shader 商城跳转。',
      '更新赞助致谢，感谢你们的支持（鞠躬）。',
    ],
  },
  {
    date: '2024.10.22',
    items: [
      '优化界面细节。',
      '增加下载序列帧功能，移除视频下载功能。',
    ],
  },
  {
    date: '2024.1.6',
    items: [
      '支持直接导出 Alpha 透明通道。',
    ],
  },
]

export default function UpdateHistory() {
  return (
    <div className="update-page">
      <h1>更新日志</h1>
      <div className="update-list">
        {HISTORY.map(entry => (
          <section className="update-entry" key={entry.date}>
            <h2 className="update-date">{entry.date}</h2>
            <ul className="update-items">
              {entry.items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>
        ))}
      </div>
      <div className="update-footer">
        <p>如您有任何建议或意见、商业合作、效果定制等需求，请联系我：</p>
        <p>微信：HPTD9527</p>
        <p>您的支持是我前进的动力，感谢您的支持！</p>
      </div>
    </div>
  )
}
