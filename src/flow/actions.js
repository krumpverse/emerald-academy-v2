import './config';
import * as fcl from '@onflow/fcl';
import { browser } from '$app/environment';
import { user } from '$stores/flow/FlowStore';
import { executeTransaction, replaceWithProperValues } from './utils';

import tipTx from './cadence/transactions/tip.cdc?raw';
import getEmeraldIDScript from './cadence/scripts/get_emerald_id.cdc?raw';

if (browser) {
	// set Svelte $user store to currentUser,
	// so other components can access it
	fcl.currentUser.subscribe(user.set, []);
}

// Lifecycle FCL Auth functions
export const unauthenticate = () => fcl.unauthenticate();
export const logIn = async () => await fcl.logIn();
export const signUp = () => fcl.signUp();

const tip = async (amount, recipient) => {
	return await fcl.mutate({
		cadence: replaceWithProperValues(tipTx),
		args: (arg, t) => [
			arg(amount, t.UFix64),
			arg(recipient, t.Address)
		],
		proposer: fcl.authz,
		payer: fcl.authz,
		authorizations: [fcl.authz],
		limit: 9999
	});
};


export const tipExecution = (amount, recipient, action) => executeTransaction(() => tip(amount, recipient), action);

export const getEmeraldID = async (address) => {
	try {
		const response = await fcl.query({
			cadence: getEmeraldIDScript,
			args: (arg, t) => [arg(address, t.Address)]
		});
		return response;
	} catch (e) {
		return null;
	}
};
