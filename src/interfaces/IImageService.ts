interface IImageService {
    getImageUrls(inputNumber: number): Promise<{ urls: string[] }>;
}

export default IImageService;
