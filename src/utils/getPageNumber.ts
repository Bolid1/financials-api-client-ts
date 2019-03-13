import {HalResource} from 'hal-rest-client';

export default function getPageNumber(resource: HalResource): number | null {
    const match = /page=(\d+)/.exec(resource.uri.uri);

    return match && match[1] ? Number(match[1]) : null;
}
