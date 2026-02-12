import type { IconProps } from '@/types/IconProps'

const ArrowIcon = ({ width, height, color }: IconProps) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 8 14"
			fill="none"
			
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M0.999999 0.999999L7 7L1 13"
				stroke={color}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round" />
		</svg>
	)
}

export default ArrowIcon
