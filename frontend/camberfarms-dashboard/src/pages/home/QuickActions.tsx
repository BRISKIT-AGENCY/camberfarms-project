import { FaPlus } from 'react-icons/fa6'
import { FiUpload } from 'react-icons/fi'
import { LuImagePlus } from 'react-icons/lu'
import { MdOutlineMessage } from 'react-icons/md'
import { TbAffiliate } from 'react-icons/tb'
import QuickActionCard, {
	type QuickActionCardProps,
} from '../../components/QuickActionCard'

export default function QuickActions() {
	return (
		<div className="w-full py-4 px-6 shadow-xs bg-white text-black rounded-2xl space-y-6 dark:text-white dark:bg-black">
			<h4 className="text-base lg:text-2xl font-semibold font-poppins capitalize py-2">
				quick actions
			</h4>
			{actions.map((card) => (
				<QuickActionCard key={card.url} {...card} />
			))}
		</div>
	)
}

const actions: QuickActionCardProps[] = [
	{
		title: 'membership forms',
		desc: "View new farmers' details",
		url: '/membership',
		Icon: FaPlus,
		Icolor: 'bg-[#16A34A]',
	},
	{
		title: 'add new products',
		desc: 'Create new agricultural products',
		url: '/products/new',
		Icon: FaPlus,
		Icolor: 'bg-[#00C0E8]',
	},
	{
		title: 'upload blogs',
		desc: 'Publish latest industry stories',
		url: '/blog/new',
		Icon: FiUpload,
		Icolor: 'bg-[#FF741F]',
	},
	{
		title: 'farm fund forms',
		desc: "View investor's details",
		url: '/farm-fund-form',
		Icon: FaPlus,
		Icolor: 'bg-[#1AD329]',
	},
	{
		title: 'manage gallery',
		desc: 'Upload and organize images',
		url: '/gallery',
		Icon: LuImagePlus,
		Icolor: 'bg-[#CB30E0]',
	},
	{
		title: 'view enquiries',
		desc: "Check client's messages",
		url: '/enquiries',
		Icon: MdOutlineMessage,
		Icolor: 'bg-[#FF383C]',
	},
	{
		title: 'upload news',
		desc: 'Publish latest industry news and insights',
		url: '/news/new',
		Icon: FiUpload,
		Icolor: 'bg-[#0088FF]',
	},
	{
		title: 'affiliate program',
		desc: 'See Camberfarms Export marketers',
		url: '/affiliate',
		Icon: TbAffiliate,
		Icolor: 'bg-[#AC7F5E]',
	},
]
