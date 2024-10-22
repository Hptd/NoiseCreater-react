import { Link } from "react-router-dom"
import noiseListInformations from '../../public/mySQL/noiseList.json'

export default function HomePage() {
  const noiseLi = noiseListInformations.map(item => (
    <li key={item.id}>
      {/* 路由跳转并带参state */}
      <Link to={item.routeHref} state={{'id': item.id, 'noiseName': item.routeHref.split('/').pop() || ''}}>
        <img src={item.imgSrc} />
        <span>
          {item.title}
        </span>
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