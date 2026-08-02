import sponsorImg from "../../public/images/wechat.png"

export default function Sponsor() {
  return (
    <div className="params-container">
      <div className="sponsor">
        <div className="sponsor-text">
          <span>图片保存前确认尺寸无误；<br />
            欢迎提供建议和意见，更欢迎商业合作：<br />
            微信：HPTD9527 <br />
            感觉不错，赞助一下吧（鞠躬）</span>
        </div>
        <img id="sponsor-img" src={sponsorImg} alt="" />
      </div>
    </div>
  )
}