import './updateHistory.css'

export default function UpdateHistory() {
  return (
    <div className="update-page">
      <h1>更新日志</h1>
      <div className="update-list">
        <span className='update-span'>
          2024.1.6<br /><br />
          支持直接导出Alpha透明通道<br /><br />
          <hr /><br />

          2024.10.22<br /><br />
          优化界面细节<br /><br />
          增加下载序列帧功能，移除视频下载功能<br /><br />
          <hr /><br />

        </span>
      </div>
      <br />
      <span className='update-footer-span'>
        如您有任何建议或意见、商业合作、效果定制等需求，请联系我：<br /><br />
        QQ: 1379830561<br /><br />
        您的支持是我前进的动力，感谢您的支持!
      </span>
    </div>
  )
}