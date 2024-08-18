// import * as https from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";

import admin from 'firebase-admin';

import { https } from "firebase-functions/v2";
import { defineSecret } from 'firebase-functions/params';
import { createPresignedUrlWithoutClient, PresignedUrlInput } from './s3';
import OpenAI from 'openai';
import { Threads } from 'openai/resources/beta/threads/threads';

admin.initializeApp();

/**
 * The access key for your AWS account.
 * 
 * # Note
 * I set up the PoLP and this account is part of a group that only allows:
 * - S3::PutObject
 * - S3::ReadObject
 * - S3::DeleteObject
 * 
 * ... Under the receipt bucket's ARN. 
 */
const AWS_ACCESS_KEY_ID = defineSecret('AWS_FIREBASE_FUNCTION_RECEIPT_CRUD_ACCESS_KEY_ID');
/**
 * The secret key for your AWS account.
 */
const AWS_SECRET_ACCESS_KEY = defineSecret('AWS_FIREBASE_FUNCTION_RECEIPT_CRUD_ACCESS_KEY_SECRET');

const AWS_RECEIPT_BUCKET = defineSecret('AWS_RECEIPT_BUCKET');

const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY")
const OPENAI_ASSISTANT_ID = defineSecret("OPENAI_ASSISTANT_ID")

export const uploadReceiptImage = https.onCall({
	secrets: [AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_RECEIPT_BUCKET]
}, async (request) => {
	if (!request.auth) throw new https.HttpsError(
		'unauthenticated',
		'You have to be signed in to upload a receipt',
	)
	
	// safe
	const uid = request.auth.uid;

	const now = Date.now();

	const resourceName = `${uid}/${now}`;

	const input = {
		bucket: AWS_RECEIPT_BUCKET.value(),
		credentials: {
			accessKeyId: AWS_ACCESS_KEY_ID.value(),
			secretAccessKey: AWS_SECRET_ACCESS_KEY.value(),
		},
		key: resourceName,
		region: 'us-west-1',
	} satisfies PresignedUrlInput;

	const presignedUrl = await createPresignedUrlWithoutClient(input)

	let image = new Image()
	image.src = request.data.Image
	// hmmm.. onload?
	// upload to s3

	const client = new OpenAI({ apiKey: OPENAI_API_KEY.value() })
	const thread = await client.beta.threads.create()
	await client.beta.threads.messages.create(thread.id, {
		role: "user", 
		content: [
			{
				type: "image_url",
				image_url: {
					detail: "auto",
					url: ""
				}
			}
		]
	})
	const run = await client.beta.threads.runs.createAndPoll(thread.id, { assistant_id: OPENAI_ASSISTANT_ID.value() })

	const receiptData = { timestamp: Date.now(), items: [] }

	// by some means, categorize each item into a finite set of categories (TDB)
	// need further testing to determine how to normalize

	return {
		presignedUrl,
		resourceName,
	}
})