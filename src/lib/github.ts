import crypto from 'crypto';

export async function verifySignature(
    payload: string,
    signature: string,
    secret: string
): Promise<boolean> {
    const hmac = crypto.createHmac('sha256', secret);
    const digest = 'sha256=' + hmac.update(payload).digest('hex');
    // timingSafeEqual required Buffer, ensuring check robustness
    return crypto.timingSafeEqual(Buffer.from(signature || ''), Buffer.from(digest));
}

export async function fetchDiff(url: string): Promise<string> {
    if (!url) return '';
    try {
        // GitHub allows fetching diff by appending .diff to commit URL or using Accept header
        // Using Accept header is cleaner for API usage
        const headers: Record<string, string> = {
            'Accept': 'application/vnd.github.v3.diff'
        };

        if (process.env.GITHUB_ACCESS_TOKEN) {
            headers['Authorization'] = `token ${process.env.GITHUB_ACCESS_TOKEN}`;
        }

        const response = await fetch(url, { headers });
        if (!response.ok) {
            console.error(`Failed to fetch diff: ${response.statusText}`);
            return '';
        }
        return await response.text();
    } catch (e) {
        console.error("Error fetching diff", e);
        return '';
    }
}
