import { inject, injectable } from 'inversify';
import IImageService from '../interfaces/IImageService';
import axios from 'axios';
import NodeCache from 'node-cache';
import TYPES from '../types';

@injectable()
export default class PixabayService implements IImageService {
    private readonly pixabayApiUrl = 'https://pixabay.com/api';
    private readonly pixabayApiKey: string;
    private readonly cache: NodeCache;

    constructor(@inject(TYPES.NodeCache) nodeCache: NodeCache) {
      this.cache = nodeCache;
      this.pixabayApiKey = process.env.PIXABAY_API_KEY || ''; // Get the API key from environment variables
    }
    async getImageUrls(inputNumber: number): Promise<{ urls: string[]; }> {
        let imageUrls;
        // Check cache
        const cachedData = this.cache.get<string[]>(`Pixabay-${inputNumber}`);
        if (cachedData) {
            imageUrls = cachedData;
        }
        else {
            let res = await axios.get(`${this.pixabayApiUrl}?key=${this.pixabayApiKey}&q=nature&per_page=${inputNumber}`)
            imageUrls = res.data.hits.map((hit: { webformatURL: any; }) => hit.webformatURL);
            this.cache.set(`Pixabay-${inputNumber}` , imageUrls);
        }
        return Promise.resolve({ urls: imageUrls });
    }

}
