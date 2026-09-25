// 非噪波节点的通用参数控件（由节点注册表的 param spec 驱动）。
import { useLang, tParam, tEnum } from '../i18n/index.js'

export default function ParamControls({ def, params, onChange }) {
  useLang()
  return (
    <div className="nc-param-list">
      {(def.params || []).map(spec => (
        <ParamRow key={spec.name} def={def} spec={spec} params={params} value={params[spec.name]} onChange={v => onChange(spec.name, v)} />
      ))}
      {(!def.params || def.params.length === 0) && <div className="nc-param-empty">该节点没有参数</div>}
    </div>
  )
}

function ParamRow({ def, spec, params, value, onChange }) {
  return (
    <div className="nc-param-row">
      <span className="nc-param-name">{tParam(def, spec)}</span>
      {renderControl(spec, value, onChange, params)}
    </div>
  )
}

// spec.bounds 指向另外两个参数名时，用它们的当前值作为滑块上下限（如 Slider 的 value 跟随 min/max）。
function dynamicBounds(spec, params) {
  if (!spec.bounds || !params) return { min: spec.min, max: spec.max }
  const min = Number(params[spec.bounds[0]])
  const max = Number(params[spec.bounds[1]])
  if (!Number.isFinite(min) || !Number.isFinite(max) || min >= max) return { min: spec.min, max: spec.max }
  return { min, max }
}

function numberInput(value, onChange, step = 0.0001) {
  return (
    <input
      className="nc-num"
      type="number"
      step={step}
      value={Number.isFinite(Number(value)) ? value : 0}
      onChange={e => onChange(Number(e.target.value))}
    />
  )
}

function renderControl(spec, value, onChange, params) {
  switch (spec.kind) {
    case 'float':
    case 'int': {
      const step = spec.kind === 'int' ? 1 : spec.step || 0.0001
      // control: 'number' —— 只给数字输入框，不给滑块（如 Constant 常量节点）
      if (spec.control === 'number') return numberInput(value, onChange, step)
      const bounds = dynamicBounds(spec, params)
      return (
        <div className="nc-param-control">
          <input
            className="nc-range"
            type="range"
            min={bounds.min}
            max={bounds.max}
            step={spec.kind === 'int' ? 1 : spec.step || 0.001}
            value={value}
            onChange={e => onChange(Number(e.target.value))}
          />
          {numberInput(value, onChange, spec.kind === 'int' ? 1 : spec.step || 0.0001)}
        </div>
      )
    }
    case 'bool':
      return <input type="checkbox" checked={Boolean(value)} onChange={e => onChange(e.target.checked)} />
    case 'enum':
      return (
        <select className="nc-select" value={value} onChange={e => onChange(e.target.value)}>
          {spec.options.map(opt => <option key={opt} value={opt}>{tEnum(opt)}</option>)}
        </select>
      )
    case 'color':
      return <input type="color" value={value || '#000000'} onChange={e => onChange(e.target.value)} />
    case 'vec2':
      return (
        <div className="nc-param-control">
          {[0, 1].map(i => (
            <input
              key={i}
              className="nc-num"
              type="number"
              step="0.001"
              value={value?.[i] ?? 0}
              onChange={e => {
                const next = [...(value || [0, 0])]
                next[i] = Number(e.target.value)
                onChange(next)
              }}
            />
          ))}
        </div>
      )
    case 'vec3':
      return (
        <div className="nc-param-control">
          {[0, 1, 2].map(i => (
            <input
              key={i}
              className="nc-num"
              type="number"
              step="0.001"
              value={value?.[i] ?? 0}
              onChange={e => {
                const next = [...(value || [0, 0, 0])]
                next[i] = Number(e.target.value)
                onChange(next)
              }}
            />
          ))}
        </div>
      )
    case 'gradient': {
      const stops = value && value.length >= 2 ? value : [{ pos: 0, color: '#000000' }, { pos: 1, color: '#ffffff' }]
      return (
        <div className="nc-param-control">
          <input
            type="color"
            value={stops[0].color}
            onChange={e => {
              const next = stops.map(s => ({ ...s }))
              next[0].color = e.target.value
              onChange(next)
            }}
          />
          <input
            type="color"
            value={stops[stops.length - 1].color}
            onChange={e => {
              const next = stops.map(s => ({ ...s }))
              next[next.length - 1].color = e.target.value
              onChange(next)
            }}
          />
        </div>
      )
    }
    default:
      return null
  }
}
