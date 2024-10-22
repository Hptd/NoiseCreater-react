import sponsorImg from "../../public/images/wechat.png"

export default function Sponsor() {
  return (
    <div className="params-container">
      <div className="sponsor">
        <div className="sponsor-text">
          <span>图片保存前确认尺寸无误；<br />
            序列帧保存：注意当前帧率(默认120fps) <br />
                      设置导出帧率；<br />
            欢迎提供建议和意见，更欢迎商业合作：<br />
            wz_ftf_offcial@163.com <br />
            感觉不错，赞助一下吧（鞠躬）</span>
        </div>
        <img id="sponsor-img" src={sponsorImg} alt="" />
      </div>
    </div>
  )
}