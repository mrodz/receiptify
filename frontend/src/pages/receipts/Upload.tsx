import { Box, Button, Card, Typography } from "@mui/material";
import { useState } from "react";
import { functions } from "../../firebase"

export default function Upload() {
	const [url, setUrl] = useState<string | undefined>();

	const generateUrl = async () => {
		const result = await functions.getReceiptUploadPresignUrl();
		setUrl(result.data.presignedUrl)
	}

	return (
		<main className="flex items-center justify-center h-full">
			<Box textAlign='center' className="flex flex-col items-center">
				<Button variant="contained" onClick={generateUrl}>Generate presigned url</Button>
				{!!url && (
					<div className="w-4/5 sm:w-2/5 md:w-3/5 mt-4">
						<Card>
							<Typography variant="body1">
								You can upload a receipt here:
							</Typography>
							{url}
						</Card>
					</div>
				)}
			</Box>

		</main>
	)
}