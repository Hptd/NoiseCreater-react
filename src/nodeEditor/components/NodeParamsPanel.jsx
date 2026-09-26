// 右侧参数面板：噪波节点复用现有 50 个参数组件（作用域 Provider），
// 其余节点用注册表驱动的通用控件。
import { Provider } from 'react-redux'
import NoiseCommonProps from '../../components/NoiseCommonProps.jsx'
import { SpecialComponentChoose } from '../../components/NoiseDetail.jsx'
import ParamControls from './ParamControls.jsx'
import SeamlessPreview from './SeamlessPreview.jsx'
import { useLang, tNode } from '../i18n/index.js'

export default function NodeParamsPanel({ node, def, store, overridden, onChange, onDelete, canDelete = true, captureNode }) {
  useLang()
  if (!node || !def) {
    return <div className="nc-panel nc-panel-empty">选中一个节点以编辑参数</div>
  }

  const isSeamless = def.type === 'artistic' && def.op === 'seamless'

  return (
    <div className={`nc-panel${isSeamless ? ' nc-panel-split' : ''}`}>
      <div className="nc-panel-head">
        <strong>{tNode(def)}</strong>
        <span className="nc-panel-type">{def.type}{def.op ? ` / ${def.op}` : ''}</span>
        {canDelete && <button className="nc-btn danger" onClick={onDelete}>删除节点</button>}
      </div>

      {overridden && overridden.length > 0 && (
        <div className="nc-overridden">
          已由外部数据节点控制：{overridden.join('、')}（滑块仍显示原值，仅作为断开后的回退）
        </div>
      )}

      <div className="nc-panel-scroll">
        {def.type === 'noise' && store ? (
          <Provider store={store}>
            <NoiseCommonProps hideOutputParams />
            <SpecialComponentChoose noiseName={def.noiseName} />
          </Provider>
        ) : (
          <ParamControls def={def} params={node.data.params || {}} onChange={onChange} />
        )}
      </div>

      {isSeamless && (
        <SeamlessPreview nodeId={node.id} tile={node.data.params?.tileCheck} capture={captureNode} />
      )}
    </div>
  )
}
