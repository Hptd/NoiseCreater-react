import { Link } from "react-router-dom"
import noiseListInformations from '../../public/mySQL/noiseList.json'

export default function HomePage() {
  const noiseLi = noiseListInformations.map(item => (
    <li key={item.id}>
      {/* 路由跳转并带参state */}
      <Link to={item.routeHref} state={{'id': item.id, 'noiseName': item.routeHref.split('/').pop() || ''}}>
        <img src={item.imgSrc} />
        {item.routeHref === 'nodeEditor' || item.title === '去点赞支持！' || item.title === '欢迎加群' ? (
          <span className="rainbow-title">
            {Array.from(item.title).map((char, index) => (
              <span
                key={index}
                className="rainbow-char"
                style={{ '--i': index }}
              >
                {char}
              </span>
            ))}
          </span>
        ) : (
          <span>
            {item.title}
          </span>
        )}
      </Link>
    </li>
  ))

  return (
    <div className="page">
      <div className="noise-list">
        <ul>
          {noiseLi}
        </ul>
      </div>

    </div>
  )
}