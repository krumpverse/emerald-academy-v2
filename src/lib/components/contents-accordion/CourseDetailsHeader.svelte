<script type="ts">
	import { Button } from '@emerald-dao/component-library';
	import Icon from '@iconify/svelte';
	import type { BootcampVideo } from '$lib/types/content/bootcamp.interface';
	import { ContentTypeEnum } from '$lib/types/content/metadata/content-types.enum';
	import { daysOfDifference } from '$lib/utilities/dataTransformation/daysOfDifference';

	export let data: BootcampVideo | any;
	export let i: number;
	export let typeOfcontent: ContentTypeEnum;
	export let open = false;

	let startTimeInISO: string;
	let finishTime;
	let finishTimeInISO: string;

	if (typeOfcontent === ContentTypeEnum.Bootcamp) {
		const timezoneOffset = new Date().getTimezoneOffset() * 60000;
		const clientTimezoneStartTime = new Date(data.date.getTime() - timezoneOffset);

		startTimeInISO = clientTimezoneStartTime.toISOString().replace(/[:.-]/g, '');

		finishTime = new Date(clientTimezoneStartTime);
		finishTime.setHours(finishTime.getHours() + 1);
		finishTimeInISO = finishTime.toISOString().replace(/[:.-]/g, '');
	}
</script>

<div class="header">
	<div class="text">
		<div class="index-and-title-wrapper">
			<div class="index-wrapper">
				<span class="small">{i + 1}</span>
			</div>
			<div class="title-wrapper">
				{#if typeOfcontent === ContentTypeEnum.Course}
					<div class="column-1">
						<h5>{data.overview.title}</h5>
						<span class="xsmall">{data.overview.description}</span>
					</div>
				{:else if typeOfcontent === ContentTypeEnum.Bootcamp}
					<h5>{data.name}</h5>
					<span class="xsmall">{data.excerpt}</span>
				{/if}
			</div>
		</div>
		<div class="button-wrapper row-3">
			{#if typeOfcontent === ContentTypeEnum.Course}
				<div class:rotate-half={open} class="down-icon-wrapper">
					<Icon icon="tabler:chevron-down" />
				</div>
			{:else if typeOfcontent === ContentTypeEnum.Bootcamp}
				{#if data.link}
					<span class="small w-medium">Finished</span>
					<Button target="_blank" href={`${data.link}`} size="small">
						<Icon icon="bi:camera-video" color="var(--clr-heading-inverse)" />
						View Video
					</Button>
				{:else if daysOfDifference(new Date(), data.date) < 0}
					<span class="small w-medium">Video available soon</span>
					<Button state="disabled" size="small">
						<Icon icon="bi:camera-video" color="var(--clr-heading-inverse)" />
						View Video
					</Button>
				{:else if daysOfDifference(new Date(), data.date) === 0}
					<span class="small w-medium">Starts today</span>
				{:else}
					<span class="small w-medium"
						>Starts in {daysOfDifference(new Date(), data.date)} days</span
					>
				{/if}
			{/if}
		</div>
	</div>
</div>

<style type="scss">
	.header {
		cursor: pointer;

		.text {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			padding: var(--space-7);
			width: 100%;

			.index-and-title-wrapper {
				display: flex;
				flex-direction: row;
				align-items: center;
				gap: var(--space-2);

				.index-wrapper {
					height: 34px;
					width: 34px;
					border-radius: 50%;
					display: grid;
					place-content: center;
					border: 1px var(--clr-border-primary) solid;
				}

				.title-wrapper {
					h5 {
						margin: 0;
						font-size: var(--font-size-3);
					}
					padding-left: var(--space-2);
				}
			}

			.button-wrapper {
				align-items: center;
				justify-content: end;
			}
		}
	}

	.down-icon-wrapper {
		transition: 0.4s;

		&.rotate-half {
			transform: rotate(180deg);
		}
	}
</style>
