import { useState } from "react"
import "./announcementModal.css"

let announcementShown = false

export default function AnnouncementModal() {
  const [visible, setVisible] = useState(!announcementShown)

  if (!visible) return null

  const close = () => {
    announcementShown = true
    setVisible(false)
  }

  return (
    <div className="announcement-mask">
      <div className="announcement-modal">
        <div className="announcement-content">
          <h2>亲爱的用户你好：</h2>
          <p>网站上线三周年了，三年时间飞逝而过，当初创建之初纯粹是因为自己也需要所以才做了。</p>
          <p>如今回首，我已然从技术美术变成了AI产品经理，在另一个天地奔波。</p>
          <p>看见B站视频下依旧有人过来点赞收藏，深知这个网站肯定还有坚持下去的意义。</p>
          <p>
            如果这个网站对您有所帮助，请您
            <a
              className="announcement-content-link"
              href="https://www.bilibili.com/video/BV1v34y1g7gU/?share_source=copy_web&vd_source=110ed7db11df1a8abe7054540cd48ee3"
              target="_blank"
              rel="noreferrer"
            >
              去点个赞
            </a>
            吧，给宣传视频一键三连、点个赞；如果有好的意见和建议就给我留言吧，让我知道这个网站还有继续存在的必要。
          </p>
          <p className="announcement-content-sign">谢谢！</p>
        </div>
        <div className="announcement-actions">
          <a
            className="announcement-btn announcement-btn-support"
            href="https://www.bilibili.com/video/BV1v34y1g7gU/?share_source=copy_web&vd_source=110ed7db11df1a8abe7054540cd48ee3"
            target="_blank"
            rel="noreferrer"
          >
            去点个赞
          </a>
          <button
            className="announcement-btn announcement-btn-close"
            onClick={close}
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  )
}
