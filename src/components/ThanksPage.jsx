import './thanksPage.css'

export default function ThanksPage() {
  return (
    <div className="thanks">
      <h1>致谢名单</h1>
      <h4>排名按先后顺序</h4>
      <div className="name-list"><span>
        *一羽, *野,
        <br />
        *子, *鷟, F*S, *),
        <br />
        *静, G*D,
        <br />
        M*L, M*n, *桃,
        <br />
        D*n, *猫
      </span></div>
      <span id='footer-span'>
        感谢上述赞助者的支持!
      </span>
    </div>
  )
}