import type { LucideIcon } from 'lucide-react'
import { Users, Clapperboard, Tv, Film, BookOpen, Monitor, Calendar, Play } from 'lucide-react'

export interface NavigationItem {
	key: string // 用于翻译键，如 'codes' -> t('nav.codes')
	path: string // URL 路径，如 '/codes'
	icon: LucideIcon // Lucide 图标组件
	isContentType: boolean // 是否对应 content/ 目录
}

export const NAVIGATION_CONFIG: NavigationItem[] = [
	{ key: 'episode', path: '/episode', icon: Tv, isContentType: true },
	{ key: 'watch', path: '/watch', icon: Play, isContentType: true },
	{ key: 'cast', path: '/cast', icon: Users, isContentType: true },
	{ key: 'guide', path: '/guide', icon: BookOpen, isContentType: true },
	{ key: 'release', path: '/release', icon: Calendar, isContentType: true },
	{ key: 'format', path: '/format', icon: Film, isContentType: true },
	{ key: 'platform', path: '/platform', icon: Monitor, isContentType: true },
	{ key: 'creator', path: '/creator', icon: Clapperboard, isContentType: true },
]

// 从配置派生内容类型列表（用于路由和内容加载）
export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map(
	(item) => item.path.slice(1),
) // 移除开头的 '/' -> ['episode', 'watch', 'cast', 'guide', 'release', 'format', 'platform', 'creator']

export type ContentType = (typeof CONTENT_TYPES)[number]

// 辅助函数：验证内容类型
export function isValidContentType(type: string): type is ContentType {
	return CONTENT_TYPES.includes(type as ContentType)
}
