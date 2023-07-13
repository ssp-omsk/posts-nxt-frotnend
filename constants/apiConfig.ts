import { Configuration } from "../services/gen/restClient";

export const apiConfig: Configuration = {
    basePath: "http://92.255.176.180:555",
    isJsonMime: function (mime: string): boolean {
        const jsonMime: RegExp = new RegExp('^(application\/json|[^;/ \t]+\/[^;/ \t]+[+]json)[ \t]*(;.*)?$', 'i');
        return mime !== null && (jsonMime.test(mime) || mime.toLowerCase() === 'application/json-patch+json');
    }
} 