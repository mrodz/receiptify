import { S3RequestPresigner } from "@aws-sdk/s3-request-presigner";
import { parseUrl } from "@smithy/url-parser";
import { Hash } from "@smithy/hash-node";
import { HttpRequest } from "@smithy/protocol-http";
import { formatUrl } from "@aws-sdk/util-format-url";
import { request } from 'https';
import type { Provider, AwsCredentialIdentity } from '@smithy/types'

export type PresignedUrlInput = {
	region: string;
	bucket: string;
	key: string;
	credentials: AwsCredentialIdentity | Provider<AwsCredentialIdentity>,
}

export const createPresignedUrlWithoutClient = async ({ region, bucket, key, credentials }: PresignedUrlInput): Promise<string> => {
	const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);

	const presigner = new S3RequestPresigner({
		credentials,
		region,
		sha256: Hash.bind(null, "sha256"),
	});

	const signedUrlObject = await presigner.presign(
		new HttpRequest({ ...url, method: "PUT" }),
	);

	return formatUrl(signedUrlObject);
};


export const put = (url: URL, data: any): Promise<string> => {
	return new Promise((resolve, reject) => {
		const req = request(
			url,
			{ method: "PUT", headers: { "Content-Length": new Blob([data]).size } },
			(res) => {
				let responseBody = "";
				res.on("data", (chunk) => {
					responseBody += chunk;
				});
				res.on("end", () => {
					resolve(responseBody);
				});
			},
		);
		req.on("error", (err) => {
			reject(err);
		});
		req.write(data);
		req.end();
	});
}