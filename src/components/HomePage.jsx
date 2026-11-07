import { Link } from "react-router-dom"
import noiseListInformations from '../../public/mySQL/noiseList.json'
// 用于挂载画布引导效果的文件引用，可随时删除如下引用行进行卸载
import NodeEditorOnboarding from './onboarding/NodeEditorOnboarding.jsx'

export default function HomePage() {
  const noiseLi = noiseListInformations.map((item, index) => (
    // 卸载画布引导请手动替换为如下行代码
    // <li key={item.id}></li>
    <li key={item.id} data-guide={item.routeHref === 'nodeEditor' ? 'nodeEditor' : undefined}>
      {/* 路由跳转并带参state */}
      <Link to={item.routeHref} state={{'id': item.id, 'noiseName': item.routeHref.split('/').pop() || ''}}>
        <img
          src={item.imgSrc}
          alt={item.title}
          width="160"
          height="160"
          loading={index < 10 ? 'eager' : 'lazy'}
          decoding="async"
        />
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
      {/* 卸载画布引导请手动删除如下一行代码 */}
      <NodeEditorOnboarding />
      <div className="noise-list">
        <ul>
          {noiseLi}
        </ul>
      </div>

    </div>
  )
}