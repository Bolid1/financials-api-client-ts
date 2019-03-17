import {HalProperty, HalResource} from 'hal-rest-client';
import {IIssuer} from '..';

export class IssuerModel extends HalResource implements IIssuer {
    @HalProperty() public id: number;
    @HalProperty() public name: string;
    @HalProperty() public type: number;
}
