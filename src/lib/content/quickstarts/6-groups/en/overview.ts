import type { Template } from '$lib/types/content/templates.interface';
import { ContentTypeEnum } from '$lib/types/content/metadata/content-types.enum';

export const overview: Template = {
	title: 'Groups',
	contentType: ContentTypeEnum.Quickstart,
	audited: true,
	web: 'React.js',
	user: {
		name: 'Emerald City',
		userAvatarUrl: 'https://avatars.githubusercontent.com/u/15198786?v=4',
		github: 'emerald-dao',
		twitter: 'emerald_dao',
		discord: 'emeraldcity'
	},
	templateRepositoryUrl: 'github.com/emerald-dao/6-groups',
	description:
		'A DApp that allows users to create Groups, join & leave them, discover Groups, and chat inside of them.'
};
