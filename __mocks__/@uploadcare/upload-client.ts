class UploadClient {
	settings: Record<string, unknown>;

	constructor(settings: Record<string, unknown>) {
		this.settings = settings;
	}
}

export {
	UploadClient,
};
