import { createFromIconfontCN } from '@ant-design/icons-vue'
import * as allIcons from '@ant-design/icons-vue'
import { Component, isVNode, PropType, resolveComponent, VNode } from 'vue'

/** 判断是否是图片链接 */
function isImg(path: string): boolean {
    return /\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(path)
}
const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

const isUrl = (path: string): boolean => reg.test(path)

const IconFont = createFromIconfontCN({
    scriptUrl:'icon-font.js',
})
//at.alicdn.com/t/c/font_4064956_97u5yxyzo0o.js

function toHump(name: string) {
    return name.replace(/\-(\w)/g, function (all, letter) {
        return letter.toUpperCase()
    })
}

const Icon = (props: { type: VNode | string; iconPrefixes?: string; prefixCls?: string }) => {
    const { type: icon, iconPrefixes = 'icon-', prefixCls = 'ant-pro' } = props
    if (!icon) {
        return null
    }
    if (typeof icon === 'string' && icon !== '') {
        if (isUrl(icon) || isImg(icon)) {
            return <img src={icon} alt="icon" class={`${prefixCls}-sider-menu-icon`} />
        }
        if (icon.startsWith(iconPrefixes)) {
            return <IconFont type={icon} />
        }
        const iconName = toHump(icon.replace(icon[0], icon[0].toUpperCase()))
        const Component = (allIcons as Record<string, any>)[iconName]
        return <Component></Component>
    }
    if (isVNode(icon)) {
        return icon
    }
    const DynamicIcon = resolveComponent(icon) as any
    return (typeof Icon === 'function' && <DynamicIcon />) || null
}

Icon.props = {
    type: {
        type: [String, Function, Object] as PropType<string | Function | VNode | JSX.Element>,
    },
    iconPrefixes: String,
    prefixCls: String,
}

export default Icon
